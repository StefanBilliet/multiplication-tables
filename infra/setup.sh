#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# Setup script for Azure Static Web Apps deployment
# =============================================================================
# This script creates all required Azure infrastructure and outputs the
# GitHub Secrets values needed to enable automated deployments.
#
# Prerequisites:
#   - az CLI logged in: az login
#   - Azure subscription selected: az account set --subscription <id>
#   - jq installed: brew install jq
#
# Usage:
#   chmod +x infra/setup.sh
#   ./infra/setup.sh
#
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$SCRIPT_DIR"
PARAMETERS_FILE="$INFRA_DIR/parameters.json"

# --- Helpers ---

info()  { echo -e "\n\033[1;34m[INFO]\033[0m  $*" ; }
warn()  { echo -e "\n\033[1;33m[WARN]\033[0m  $*" ; }
error() { echo -e "\n\033[1;31m[ERROR]\033[0m $*" >&2 ; exit 1 ; }

require() {
  command -v "$1" >/dev/null 2>&1 || error "Required: $1 not found. $2"
}

# --- Prerequisites ---

info "Checking prerequisites..."
require az "Install: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
require jq "Install: brew install jq"

info "Verifying Azure login..."
az account show > /dev/null || error "Run 'az login' first"

info "Verifying subscription..."
subscription_id=$(az account show --query id -o tsv)
tenant_id=$(az account show --query tenantId -o tsv)
info "Subscription: $subscription_id"
info "Tenant:      $tenant_id"

# --- Variables ---

app_name="multiplication-tables"
location="westeurope"
repo_url="https://github.com/stefanbilliet/multiplication-tables"
branch="main"
deployment_name="swa-$(date +%Y%m%d%H%M%S)"

# Load from parameters.json if present
if [[ -f "$PARAMETERS_FILE" ]]; then
  app_name=$(jq -r '.parameters.staticWebAppName.value // "'"$app_name"'"' "$PARAMETERS_FILE")
  repo_url=$(jq -r '.parameters.repositoryUrl.value // "'"$repo_url"'"' "$PARAMETERS_FILE")
  branch=$(jq -r '.parameters.branch.value // "'"$branch"'"' "$PARAMETERS_FILE")
  location=$(jq -r '.parameters.location.value // "'"$location"'"' "$PARAMETERS_FILE")
fi

rg_name="rg-${app_name}"

info "Static Web App name: $app_name"
info "Resource Group:     $rg_name"
info "Repository:         $repo_url"
info "Branch:             $branch"
info "Location:           $location"

# --- Step 1: Deploy Static Web App via Bicep ---

info "Step 1/5 — Deploying Static Web App via Bicep..."

rg_exists=$(az group show --name "$rg_name" --query "name" -o tsv 2>/dev/null || true)

if [[ -n "$rg_exists" && "$rg_exists" != "None" ]]; then
  info "Resource group '$rg_name' already exists. Deploying to it..."
  az deployment group create \
    --name "$deployment_name" \
    --resource-group "$rg_name" \
    --template-file "$INFRA_DIR/staticwebapp.bicep" \
    --parameters staticWebAppName="$app_name" \
    --query "properties.outputs.staticWebAppName.value" -o tsv | tr -d '\n'
else
  info "Creating resource group and deploying..."
  az deployment sub create \
    --name "$deployment_name" \
    --location "$location" \
    --template-file "$INFRA_DIR/main.bicep" \
    --parameters "$PARAMETERS_FILE" \
    --query "properties.outputs.staticWebAppName.value" -o tsv | tr -d '\n'
fi
echo
info "Static Web App deployed."

# --- Step 2: Create Azure AD app registration ---

info "Step 2/5 — Creating Azure AD app registration..."

existing_app=$(az ad app list \
  --display-name "${app_name}-deploy" \
  --query "[0].appId" -o tsv 2>/dev/null || true)

if [[ -n "$existing_app" && "$existing_app" != "None" ]]; then
  info "Azure AD app '${app_name}-deploy' already exists. Reusing appId: $existing_app"
  client_id="$existing_app"

  az ad sp create --id "$client_id" > /dev/null 2>/dev/null || true
  info "Service principal ensured."
else
  client_id=$(az ad app create \
    --display-name "${app_name}-deploy" \
    --query "appId" -o tsv)
  info "Created Azure AD app registration: $client_id"

  az ad sp create --id "$client_id" > /dev/null
  info "Service principal created."
fi

# --- Step 3: Add federated credential ---

info "Step 3/5 — Adding federated credential for GitHub..."

issuer="https://token.actions.githubusercontent.com"
repo_slug=$(basename "$repo_url")
raw_owner=$(basename "$(dirname "$repo_url")")

if command -v gh > /dev/null 2>&1; then
  owner=$(gh api "repos/${raw_owner}/${repo_slug}" --jq '.owner.login' 2>/dev/null || echo "$raw_owner")
else
  owner="$raw_owner"
fi
credential_name="github-deploy"

# Check if credential already exists
existing_cred=$(az ad app federated-credential list \
  --id "$client_id" \
  --query "[?name=='$credential_name'].name" -o tsv 2>/dev/null || true)

if [[ -n "$existing_cred" ]]; then
  info "Federated credential '$credential_name' already exists. Skipping."
else
  az ad app federated-credential create \
    --id "$client_id" \
    --parameters "{ \
      \"name\": \"$credential_name\", \
      \"issuer\": \"$issuer\", \
      \"subject\": \"repo:${owner}/${repo_slug}:environment:production\", \
      \"audiences\": [\"api://AzureADTokenExchange\"] \
    }" > /dev/null
  info "Federated credential added (issuer: $issuer)"
fi

# --- Step 4: Assign Contributor role ---

info "Step 4/5 — Assigning Contributor role..."

role_exists=$(az role assignment list \
  --role Contributor \
  --assignee "$client_id" \
  --scope "/subscriptions/$subscription_id" \
  --query "[0].id" -o tsv 2>/dev/null || true)

if [[ -n "$role_exists" && "$role_exists" != "None" ]]; then
  info "Contributor role already assigned. Skipping."
else
  az role assignment create \
    --role Contributor \
    --scope "/subscriptions/$subscription_id" \
    --assignee "$client_id" > /dev/null
  info "Contributor role assigned."
fi

# --- Step 5: Retrieve Static Web App deployment token ---

info "Step 5/5 — Retrieving Static Web App deployment token..."

swa_token=$(az staticwebapp secrets list \
  --name "$app_name" \
  --query "properties.apiKey" -o tsv)

info "Deployment token retrieved."

# --- Summary ---

echo
echo "============================================================"
echo "  Setup complete!"
echo "============================================================"
echo
echo "Add these as GitHub Secrets in your repository"
echo "  Settings → Secrets and variables → Actions → New repository secret"
echo
printf "  %-35s %s\n" "AZURE_CLIENT_ID" "$client_id"
printf "  %-35s %s\n" "AZURE_TENANT_ID" "$tenant_id"
printf "  %-35s %s\n" "AZURE_SUBSCRIPTION_ID" "$subscription_id"
printf "  %-35s %s\n" "AZURE_STATIC_WEB_APPS_TOKEN" "$swa_token"
echo
echo "Or run this one-liner to set them all at once:"
echo
echo "  gh secret set AZURE_CLIENT_ID --body '$client_id' && \\"
echo "  gh secret set AZURE_TENANT_ID --body '$tenant_id' && \\"
echo "  gh secret set AZURE_SUBSCRIPTION_ID --body '$subscription_id' && \\"
echo "  gh secret set AZURE_STATIC_WEB_APPS_TOKEN --body '$swa_token'"
echo
echo "============================================================"
echo
info "Pushing to main will trigger deploy.yml automatically."
info "Your app will be live at: https://${app_name}.${location}.1.azurestaticapps.net/"
