const debug = require('debug')('damn:client')
const request = require('request')

const BASE_URL = 'https://www.deviantart.com/api/v1/oauth2/'
const USER_AGENT = 'dAmn'

class HttpClient {
  constructor (accessToken, baseUrl = BASE_URL) {
    this.accessToken = accessToken
    this.baseUrl = baseUrl

    this.jar = request.jar()
  }

  parseBody (response) {
    const contentType = response.headers['content-type']
    const body = response.body

    if (contentType.includes('application/json')) {
      return JSON.parse(body)
    }

    return body
  }

  sendRequest (options) {
    return new Promise((resolve, reject) => {
      request(options, (err, response) => {
        if (err) return reject(err)
        return resolve(response)
      })
    })
  }

  request (method, path, qs = {}, body = null, headers = {}) {
    const url = `${this.baseUrl}${path}`
    debug(url)
    const jar = this.jar

    Object.assign(headers, { Accept: 'application/json', 'User-Agent': USER_AGENT })

    if (this.accessToken) {
      Object.assign(qs, { access_token: this.accessToken })
    }

    return this.sendRequest({
      body,
      headers,
      jar,
      method,
      qs,
      url
    })
  }

  get (url, qs) {
    return this.request('GET', url, qs).then(this.parseBody)
  }

  post (url, body) {
    return this.request('POST', url, {}, body, {
      'Content-type': 'application/json'
    }).then(this.parseBody)
  }
}

module.exports = HttpClient
