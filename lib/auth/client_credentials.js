const debug = require('debug')('damn:auth:cc')
const AuthenticationStrategy = require('./base')

class ClientCredentials extends AuthenticationStrategy {
  constructor (clientId, clientSecret) {
    super('https://www.deviantart.com/')
    this.clientId = clientId
    this.clientSecret = clientSecret
  }

  getToken () {
    const qs = {
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret
    }

    return this.client.get('oauth2/token', qs)
      .then(data => data.access_token)
      .then(token => {
        debug(`Authentication successful (clientId: ${this.clientId})`)
        return token
      })
  }
}

module.exports = ClientCredentials
