jest.mock('../client', () => {
  const get = jest.fn(() => Promise.resolve({ access_token: 'abc' }))

  return jest.fn(() => ({
    get
  }))
})

const ClientCredentials = require('./client_credentials')
const HttpClient = require('../client')

describe('ClientCredentials', () => {
  const clientId = 'qdqmdsk'
  const clientSecret = 'qsdqldmlq'
  let clientCredentials = null

  beforeEach(() => {
    HttpClient.mockClear()
    clientCredentials = new ClientCredentials(clientId, clientSecret)
    clientCredentials.client.get.mockClear()
  })

  describe('constructor(clientId, clientSecret)', () => {
    it('instanciate a client with the base URL', () => {
      expect(clientCredentials).toHaveProperty('client')

      expect(HttpClient).toHaveBeenCalledTimes(1)
      expect(HttpClient.mock.calls[0][1]).toBe('https://www.deviantart.com/')
    })

    it('saves the clientId and the clientSecret', () => {
      expect(clientCredentials).toHaveProperty('clientId', clientId)
      expect(clientCredentials).toHaveProperty('clientSecret', clientSecret)
    })
  })

  describe('getToken()', () => {
    it('should return a promise', () => {
      expect(clientCredentials.getToken()).toBeInstanceOf(Promise)
    })

    it('should make an API call', () => {
      clientCredentials.getToken()

      expect(clientCredentials.client.get).toHaveBeenCalledTimes(1)
      expect(clientCredentials.client.get.mock.calls[0]).toEqual([
        'oauth2/token',
        {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials'
        }
      ])
    })

    it('should return an access token', () => {
      const accessToken = 'jqosdkqd'
      clientCredentials.client.get.mockReturnValue(
        Promise.resolve({ access_token: accessToken })
      )

      expect(clientCredentials.getToken()).resolves.toBe(accessToken)
    })
  })
})
