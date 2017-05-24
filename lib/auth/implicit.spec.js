jest.mock('../client', () => {
  const get = jest.fn()
  const _request = jest.fn()

  return jest.fn(() => ({
    _request,
    get
  }))
})

const Implicit = require('./implicit')
const HttpClient = require('../client')

describe('Implicit', () => {
  const clientId = 'qdqmdsk'
  const redirectUri = 'qsdqldmlq'
  const validateKey = 'abc01234defabc01234def'
  const validateToken = 'abc01234def'
  const username = 'pqdlmq'
  const password = 'qsdkqpdlqmlù'
  const scope = 'qsdmqldm'

  let implicit = null

  beforeEach(() => {
    HttpClient.mockClear()
    implicit = new Implicit(clientId, redirectUri)
    implicit.client.get.mockClear()
    implicit.client._request.mockClear()
  })

  describe('constructor(clientId, redirectUri)', () => {
    it('instanciate a client with the base URL', () => {
      expect(implicit).toHaveProperty('client')

      expect(HttpClient).toHaveBeenCalledTimes(1)
      expect(HttpClient.mock.calls[0][1]).toBe('https://www.deviantart.com/')
    })

    it('saves the clientId and the redirectUri', () => {
      expect(implicit).toHaveProperty('clientId', clientId)
      expect(implicit).toHaveProperty('redirectUri', redirectUri)
    })
  })

  describe('getCSRF()', () => {
    const body = `
      random stuff
      name="validate_token" value="${validateToken}"
      more stuff
      name="validate_key" value="${validateKey}"
      even more stuff
    `

    it('should return a promise', () => {
      implicit.client.get.mockReturnValue(Promise.resolve(body))
      expect(implicit.getCSRF()).toBeInstanceOf(Promise)
    })

    it('should make an API call', () => {
      implicit.getCSRF()

      expect(implicit.client.get).toHaveBeenCalledTimes(1)
      expect(implicit.client.get.mock.calls[0]).toEqual(['users/rockedout'])
    })

    it('should return CSRF data', () => {
      implicit.client.get.mockReturnValue(Promise.resolve(body))

      expect(implicit.getCSRF()).resolves.toEqual({
        validateKey,
        validateToken
      })
    })
  })

  describe('login(username, password)', () => {
    it('should return a promise', () => {
      expect(implicit.login('', '')).toBeInstanceOf(Promise)
    })

    it('should make an API call', () => {
      return implicit.login(username, password)
      .then(() => {
        expect(implicit.client._request).toHaveBeenCalledTimes(1)
        expect(implicit.client._request.mock.calls[0]).toEqual([{
          form: {
            username,
            password,
            validate_key: validateKey,
            validate_token: validateToken
          },
          method: 'POST',
          url: 'https://www.deviantart.com/users/login'
        }])
      })
    })
  })

  describe('authorize(scope)', () => {
    const accessToken = 'ff00ee11dd22cc33bb44aa55'

    beforeAll(() => {
      implicit.client._request.mockImplementation(options => Promise.resolve({
        headers: {
          location: `http://a.b/c?state=${options.qs ? options.qs.state : ''}&access_token=${accessToken}`
        }
      }))
    })

    it('should return a promise', () => {
      expect(implicit.authorize('')).toBeInstanceOf(Promise)
    })

    it('should make an API call', () => {
      return implicit.authorize(scope)
      .then(() => {
        expect(implicit.client._request).toHaveBeenCalledTimes(1)
        expect(implicit.client._request.mock.calls[0]).toEqual([{
          followRedirect: false,
          method: 'GET',
          qs: {
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: 'token',
            scope,
            state: expect.anything()
          },
          url: 'https://www.deviantart.com/oauth2/authorize'
        }])
      })
    })

    it('returns a token', () => {
      const accessToken = 'ff00ee11dd22cc33bb44aa55'

      implicit.client._request.mockImplementation(options => Promise.resolve({
        headers: {
          location: `http://a.b/c?state=${options.qs ? options.qs.state : ''}&access_token=${accessToken}`
        }
      }))

      expect(implicit.authorize(scope)).resolves.toBe(accessToken)
    })

    it('throws an error when state do not match', () => {
      const accessToken = 'ff00ee11dd22cc33bb44aa55'

      implicit.client._request.mockImplementationOnce(() => Promise.resolve({
        headers: {
          location: `http://a.b/c?state=0000000&access_token=${accessToken}`
        }
      }))

      expect(implicit.authorize(scope)).rejects.toBeInstanceOf(Error)
    })
  })

  describe('getToken()', () => {
    it('should return a promise', () => {
      expect(implicit.getToken(username, password, scope)).toBeInstanceOf(Promise)
    })
  })
})
