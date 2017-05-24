jest.mock('./client', () => {
  const get = jest.fn()

  return jest.fn(() => ({
    get
  }))
})

const HttpClient = require('./client')
const Damn = require('./damn')

describe('Damn', () => {
  const token = 'qpkdqsdqldk'
  let damn = null

  beforeEach(() => {
    damn = new Damn(token)
    damn.client.get.mockClear()
  })

  describe('constructor(accessToken)', () => {
    it('instanciate a client with the given token', () => {
      expect(damn).toHaveProperty('client')

      expect(HttpClient).toHaveBeenCalledTimes(1)
      expect(HttpClient.mock.calls[0][0]).toBe(token)
    })
  })

  describe('placebo()', () => {
    it('calls the placebo endpoint', () => {
      const expected = 'odqkmdl'
      damn.client.get.mockReturnValue(expected)

      const result = damn.placebo()

      expect(damn.client.get).toHaveBeenCalledTimes(1)
      expect(damn.client.get.mock.calls[0]).toEqual(['placebo'])
      expect(result).toBe(expected)
    })
  })

  describe('checkAccessToken()', () => {
    it('calls the placebo endpoint', () => {
      damn.client.get.mockReturnValue(Promise.resolve({ data: 'hey' }))

      damn.checkAccessToken()

      expect(damn.client.get).toHaveBeenCalledTimes(1)
      expect(damn.client.get.mock.calls[0]).toEqual(['placebo'])
    })

    it('returns a promise', () => {
      damn.client.get.mockReturnValue(Promise.resolve({}))

      const result = damn.checkAccessToken()

      expect(result).toBeInstanceOf(Promise)
    })

    it('returns true if the call is a success', () => {
      damn.client.get.mockReturnValue(
        Promise.resolve({ status: 'success' })
      )

      const result = damn.checkAccessToken()

      expect(result).resolves.toBe(true)
    })

    it('returns false otherwise', () => {
      damn.client.get.mockReturnValue(
        Promise.resolve({ status: 'notsuccess' })
      )

      const result = damn.checkAccessToken()

      expect(result).resolves.toBe(false)
    })
  })

  describe('getDailyDeviations()', () => {
    it('calls the endpoint', () => {
      damn.client.get.mockReturnValue(Promise.resolve({ data: 'hey' }))

      damn.getDailyDeviations()

      expect(damn.client.get).toHaveBeenCalledTimes(1)
      expect(damn.client.get.mock.calls[0]).toEqual(['browse/dailydeviations'])
    })

    it('returns a promise', () => {
      damn.client.get.mockReturnValue(Promise.resolve({}))

      const result = damn.getDailyDeviations()

      expect(result).toBeInstanceOf(Promise)
    })

    it('returns a list of deviations', () => {
      const results = 'qlsdqlm'
      damn.client.get.mockReturnValue(Promise.resolve({ results }))

      expect(damn.getDailyDeviations()).resolves.toBe(results)
    })
  })

  describe('getDeviation(deviationId)', () => {
    const deviationId = 'qposdqpdsl'

    it('calls the endpoint', () => {
      damn.client.get.mockReturnValue(Promise.resolve({ data: 'hey' }))

      damn.getDeviation(deviationId)

      expect(damn.client.get).toHaveBeenCalledTimes(1)
      expect(damn.client.get.mock.calls[0]).toEqual([`deviation/${deviationId}`])
    })

    it('returns a promise', () => {
      damn.client.get.mockReturnValue(Promise.resolve({}))

      const result = damn.getDeviation(deviationId)

      expect(result).toBeInstanceOf(Promise)
    })

    it('returns a deviation', () => {
      const results = 'qlsdqlm'
      damn.client.get.mockReturnValue(Promise.resolve(results))

      expect(damn.getDeviation(deviationId)).resolves.toBe(results)
    })
  })

  describe('getNotifications()', () => {
    it('calls the endpoint', () => {
      damn.client.get.mockReturnValue(Promise.resolve({ data: 'hey' }))

      damn.getNotifications()

      expect(damn.client.get).toHaveBeenCalledTimes(1)
      expect(damn.client.get.mock.calls[0]).toEqual(['feed/notifications'])
    })

    it('returns a promise', () => {
      damn.client.get.mockReturnValue(Promise.resolve({}))

      const result = damn.getNotifications()

      expect(result).toBeInstanceOf(Promise)
    })

    it('returns a list of deviations', () => {
      const items = 'qlsdqlm'
      damn.client.get.mockReturnValue(Promise.resolve({ items }))

      expect(damn.getNotifications()).resolves.toBe(items)
    })
  })

  describe('getWatchFeed()', () => {
    it('calls the endpoint', () => {
      damn.client.get.mockReturnValue(Promise.resolve({ data: 'hey' }))

      damn.getWatchFeed()

      expect(damn.client.get).toHaveBeenCalledTimes(1)
      expect(damn.client.get.mock.calls[0]).toEqual(['feed/home'])
    })

    it('returns a promise', () => {
      damn.client.get.mockReturnValue(Promise.resolve({}))

      const result = damn.getWatchFeed()

      expect(result).toBeInstanceOf(Promise)
    })

    it('returns a list of deviations', () => {
      const items = 'qlsdqlm'
      damn.client.get.mockReturnValue(Promise.resolve({ items }))

      expect(damn.getWatchFeed()).resolves.toBe(items)
    })
  })
})
