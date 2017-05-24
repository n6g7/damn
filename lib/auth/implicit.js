const debug = require('debug')('damn:auth:implicit')
const uuid = require('uuid')
const AuthenticationStrategy = require('./base')

class Implicit extends AuthenticationStrategy {
  constructor (clientId, redirectUri) {
    super('https://www.deviantart.com/')
    this.clientId = clientId
    this.redirectUri = redirectUri
  }

  getCSRF () {
    return this.client.get('users/rockedout')
    .then(body => {
      const validateToken = /name="validate_token" value="([0-9a-f]+)"/.exec(body)[1]
      const validateKey = /name="validate_key" value="([0-9a-f]+)"/.exec(body)[1]

      return {
        validateKey,
        validateToken
      }
    })
  }

  login (username, password) {
    return this.getCSRF()
    .then(csrf => this.client._request({
      form: {
        username,
        password,
        validate_token: csrf.validateToken,
        validate_key: csrf.validateKey
      },
      method: 'POST',
      url: 'https://www.deviantart.com/users/login'
    }))
  }

  authorize (scope) {
    const state = uuid.v4()

    return this.client._request({
      followRedirect: false,
      method: 'GET',
      qs: {
        response_type: 'token',
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
        state,
        scope
      },
      url: 'https://www.deviantart.com/oauth2/authorize'
    })
    .then(response => {
      const location = response.headers.location

      const returnedState = /state=([0-9a-f-]+)&?/.exec(location)[1]
      const accessToken = /access_token=([0-9a-f]+)&?/.exec(location)[1]

      if (returnedState !== state) throw Error('States do not match')

      return accessToken
    })
  }

  getToken (username, password, scope = 'basic') {
    return this.login(username, password)
      .then(() => this.authorize(scope))
      .then(token => {
        debug(`Authentication successful (clientId: ${this.clientId}, user: ${username})`)
        return token
      })
  }
}

module.exports = Implicit
