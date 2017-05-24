jest.mock('request', () => {
  const main = jest.fn()
  main.jar = jest.fn()

  return main
})

const HttpClient = require('./client')

const request = require('request')

describe('HttpClient', () => {
  describe('constructor(version)', () => {
    it('sets an access token', () => {
      const token = 'qpkdqsdqldk'
      const client = new HttpClient(token)

      expect(client).toHaveProperty('accessToken', token)
    })

    it('sets a default base URL', () => {
      const client = new HttpClient()

      expect(client).toHaveProperty('baseUrl', 'https://www.deviantart.com/api/v1/oauth2/')
    })

    it('has an overridable base URL', () => {
      const client = new HttpClient('token', 'hello')

      expect(client).toHaveProperty('baseUrl', 'hello')
    })
  })

  describe('request(method, url, qs, body)', () => {
    beforeEach(() => {
      request.mockClear()
    })

    it('returns a promise', () => {
      const client = new HttpClient()

      expect(client.request('a', 'b')).toBeInstanceOf(Promise)
    })

    it('uses the access token', () => {
      const token = 'qsmdlmq'
      const client = new HttpClient(token)

      client.request('qmldsqlm', 'jkjk')

      expect(request).toHaveBeenCalledTimes(1)
      expect(request.mock.calls[0][0]).toHaveProperty('qs.access_token', token)
    })

    it('makes a request with the passed method', () => {
      const client = new HttpClient()
      const method = 'qpsdpqld'

      client.request(method, 'jkjk')

      expect(request).toHaveBeenCalledTimes(1)
      expect(request.mock.calls[0][0]).toHaveProperty('method', method)
    })

    it('makes a request to the passed url', () => {
      const client = new HttpClient()
      const url = 'qsmdlqls'

      client.request('GET', url)

      expect(request).toHaveBeenCalledTimes(1)
      expect(request.mock.calls[0][0]).toHaveProperty('url', `${client.baseUrl}${url}`)
    })
  })

  describe('get(url, qs)', () => {
    beforeEach(() => {
      request.mockClear()
    })

    it('returns a promise', () => {
      const client = new HttpClient()

      expect(client.get('a')).toBeInstanceOf(Promise)
    })

    it('makes a GET request', () => {
      const client = new HttpClient()
      const url = 'qpsdpqld'

      client.get(url)

      expect(request).toHaveBeenCalledTimes(1)
      expect(request.mock.calls[0][0]).toHaveProperty('method', 'GET')
      expect(request.mock.calls[0][0]).toHaveProperty('url', `${client.baseUrl}${url}`)
    })

    it('appends the querystring to the end of the url', () => {
      const client = new HttpClient()
      const url = 'qsmdlqls'

      client.get(url, { a: 'b' })

      expect(request).toHaveBeenCalledTimes(1)
      expect(request.mock.calls[0][0]).toHaveProperty('url', `${client.baseUrl}${url}`)
      expect(request.mock.calls[0][0]).toHaveProperty('qs', { a: 'b' })
    })
  })

  describe('post(url, body)', () => {
    beforeEach(() => {
      request.mockClear()
    })

    it('returns a promise', () => {
      const client = new HttpClient()

      expect(client.post('a', {})).toBeInstanceOf(Promise)
    })

    it('makes a POST request', () => {
      const client = new HttpClient()
      const url = 'qpsdpqld'
      const data = { hey: 'qskdl' }

      client.post(url, data)

      expect(request).toHaveBeenCalledTimes(1)
      expect(request.mock.calls[0][0]).toHaveProperty('method', 'POST')
      expect(request.mock.calls[0][0]).toHaveProperty('url', `${client.baseUrl}${url}`)
      expect(request.mock.calls[0][0]).toHaveProperty('body', data)
    })
  })
})
