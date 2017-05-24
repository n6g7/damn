const HttpClient = require('../client')

class AuthenticationStrategy {
  constructor (baseURL = '') {
    this.client = new HttpClient(null, baseURL)
  }

  getToken () {
    throw Error('Implement me!')
  }
}

module.exports = AuthenticationStrategy
