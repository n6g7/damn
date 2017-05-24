const auth = require('./auth')
const Damn = require('./damn')

module.exports = {
  clientCredentials: (clientId, clientSecret) => {
    const clientCredentials = new auth.ClientCredentials(clientId, clientSecret)

    return clientCredentials.getToken().then(token => new Damn(token))
  },

  implicit: (clientId, redirectUri, username, password, scope) => {
    const implicit = new auth.Implicit(clientId, redirectUri)

    return implicit.getToken(username, password, scope).then(token => new Damn(token))
  }
}
