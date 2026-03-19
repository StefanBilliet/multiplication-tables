targetScope = 'resourceGroup'

@description('Name of the Static Web App')
param staticWebAppName string

@description('Full GitHub repository URL')
param repositoryUrl string

@description('GitHub branch to deploy from')
param branch string

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: staticWebAppName
  location: resourceGroup().location
  properties: {
    repositoryUrl: repositoryUrl
    branch: branch
    buildProperties: {
      appLocation: '/'
      outputLocation: 'dist'
      apiLocation: ''
    }
    provider: 'GitHub'
  }
  sku: {
    name: 'Free'
    tier: 'Free'
  }
}

output staticWebAppName string = staticWebApp.name
output defaultHostname string = staticWebApp.properties.defaultHostname
