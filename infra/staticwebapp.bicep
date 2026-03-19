targetScope = 'resourceGroup'

@description('Name of the Static Web App')
param staticWebAppName string

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: staticWebAppName
  location: resourceGroup().location
  properties: {
    provider: 'None'
  }
  sku: {
    name: 'Free'
    tier: 'Free'
  }
}

output staticWebAppName string = staticWebApp.name
output defaultHostname string = staticWebApp.properties.defaultHostname
