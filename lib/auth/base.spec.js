jest.mock('../client', () => jest.fn())

const AuthenticationStrategy = require('./base')
const HttpClient = require('../client')

describe('AuthenticationStrategy', () => {
  const baseUrl = 'qdqmdsk'
  let baseAuth = null

  beforeEach(() => {
    HttpClient.mockClear()
    baseAuth = new AuthenticationStrategy(baseUrl)
  })

  describe('constructor(baseURL)', () => {
    it('instanciate a client with the base URL', () => {
      expect(baseAuth).toHaveProperty('client')

      expect(HttpClient).toHaveBeenCalledTimes(1)
      expect(HttpClient.mock.calls[0][1]).toBe(baseUrl)
    })

    it('has a default base URL', () => {
      baseAuth = new AuthenticationStrategy()
      expect(baseAuth).toHaveProperty('client')

      expect(HttpClient).toHaveBeenCalledTimes(2)
      expect(HttpClient.mock.calls[1][1]).toBe('')
    })
  })

  describe('getToken()', () => {
    it('should not be implemented', () => {
      expect(baseAuth.getToken).toThrowErrorMatchingSnapshot()
    })
  })
})
