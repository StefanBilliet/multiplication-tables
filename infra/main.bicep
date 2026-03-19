targetScope = 'subscription'

@description('Azure region for all resources')
param location string = 'westeurope'

@description('Name of the Static Web App')
param staticWebAppName string

@description('Name of the resource group to create')
param resourceGroupName string = 'rg-${staticWebAppName}'

resource resourceGroup 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
}

module staticWebApp 'staticwebapp.bicep' = {
  name: '${staticWebAppName}-deployment'
  scope: resourceGroup
  params: {
    staticWebAppName: staticWebAppName
  }
}

output staticWebAppName string = staticWebApp.outputs.staticWebAppName
output defaultHostname string = staticWebApp.outputs.defaultHostname
output resourceGroupName string = resourceGroup.name
