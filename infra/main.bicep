targetScope = 'subscription'

@description('Azure region for all resources')
param location string = 'westeurope'

@description('Name of the Static Web App')
param staticWebAppName string

@description('Name of the resource group to create')
param resourceGroupName string = 'rg-${staticWebAppName}'

@description('Full GitHub repository URL')
param repositoryUrl string = 'https://github.com/stefanbilliet/multiplication-tables'

@description('GitHub branch to deploy from')
param branch string = 'main'

resource resourceGroup 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
}

module staticWebApp 'staticwebapp.bicep' = {
  name: '${staticWebAppName}-deployment'
  scope: resourceGroup
  params: {
    staticWebAppName: staticWebAppName
    repositoryUrl: repositoryUrl
    branch: branch
  }
}

output staticWebAppName string = staticWebApp.outputs.staticWebAppName
output defaultHostname string = staticWebApp.outputs.defaultHostname
output resourceGroupName string = resourceGroup.name
