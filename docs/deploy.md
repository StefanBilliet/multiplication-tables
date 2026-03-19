# Deploying to Azure Static Web Apps

## Prerequisites

- `az` CLI — [install guide](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- `jq` — `brew install jq` (macOS)
- Azure subscription
- GitHub repository

## One-time setup (run once)

```bash
chmod +x infra/setup.sh
./infra/setup.sh
```

`setup.sh` automates everything:

1. Deploys the Static Web App via Bicep
2. Creates the Azure AD app registration
3. Adds the federated credential (links GitHub → Azure via OIDC)
4. Assigns `Contributor` role to the subscription
5. Retrieves the deployment token
6. Prints the four GitHub Secrets values

## Configure GitHub Secrets

Add the four values printed by `setup.sh` to your repository:

| Secret Name | Source |
|-------------|--------|
| `AZURE_CLIENT_ID` | output from `setup.sh` |
| `AZURE_TENANT_ID` | output from `setup.sh` |
| `AZURE_SUBSCRIPTION_ID` | output from `setup.sh` |
| `AZURE_STATIC_WEB_APPS_TOKEN` | output from `setup.sh` |

Or copy-paste the `gh secret set` one-liner from the output.

## Deploy

Push to `main`:

```bash
git add . && git commit -m "infra: add Azure Static Web Apps deployment" && git push
```

The `deploy.yml` workflow takes over from there.

## Project Structure

```
infra/
  main.bicep                 # Static Web App resource definition
  parameters.json            # Parameter values (edit before running)
  staticwebapp.config.json   # SPA routing + MIME types
  setup.sh                   # One-time setup script (run this!)

.github/workflows/
  deploy.yml                 # Deploys on push to main
  preview.yml                # Preview environments on PRs
```

## Customising parameters

Edit `infra/parameters.json` before running `setup.sh`:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `staticWebAppName` | `multiplication-tables` | Azure resource name |
| `location` | `westeurope` | Azure region |
| `repositoryUrl` | `stefanbilliet/multiplication-tables` | GitHub repo |
| `branch` | `main` | Branch to deploy |

## Troubleshooting

### "Invalid client secret" on workflow run
The federated credential subject doesn't match. Re-run `setup.sh` — it checks for existing credentials and skips them. Verify the GitHub repo/branch in `infra/parameters.json` matches.

### 404 on refresh after deploy
Run the config command manually:

```bash
az staticwebapp appsettings set \
  --name multiplication-tables \
  --setting-file infra/staticwebapp.config.json
```

### Workflow succeeds but app is stale
The `dist/` artifact in the workflow is fresh. Hard-refresh the browser or check the deployment timestamp in the Azure Portal.
