jest.mock('./client', () => {
  const get = jest.fn()

  return jest.fn(() => ({
    get
  }))
})

const HttpClient = require('./client')
const Damn = require('./damn')

const qsPagination = Object.freeze({ limit: 10, offset: 20 })

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
      damn.client.get.mockReturnValue(Promise.resolve({ status: 'success' }))

      const result = damn.checkAccessToken()

      expect(result).resolves.toBe(true)
    })

    it('returns false otherwise', () => {
      damn.client.get.mockReturnValue(Promise.resolve({ status: 'notsuccess' }))

      const result = damn.checkAccessToken()

      expect(result).resolves.toBe(false)
    })
  })

  describe('getDailyDeviations()', () => {
    it('calls the endpoint', () => {
      damn.client.get.mockReturnValue(Promise.resolve({ data: 'hey' }))

      damn.getDailyDeviations()
      damn.getDailyDeviations(qsPagination)

      expect(damn.client.get).toHaveBeenCalledTimes(2)
      expect(damn.client.get.mock.calls[0]).toEqual(['browse/dailydeviations', {}])
      expect(damn.client.get.mock.calls[1]).toEqual(['browse/dailydeviations', qsPagination])
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
      damn.getDeviation(deviationId, qsPagination)

      expect(damn.client.get).toHaveBeenCalledTimes(2)
      expect(damn.client.get.mock.calls[0]).toEqual([`deviation/${deviationId}`, {}])
      expect(damn.client.get.mock.calls[1]).toEqual([`deviation/${deviationId}`, qsPagination])
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
      damn.getNotifications(qsPagination)

      expect(damn.client.get).toHaveBeenCalledTimes(2)
      expect(damn.client.get.mock.calls[0]).toEqual(['feed/notifications', {}])
      expect(damn.client.get.mock.calls[1]).toEqual(['feed/notifications', qsPagination])
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
      damn.getWatchFeed(qsPagination)

      expect(damn.client.get).toHaveBeenCalledTimes(2)
      expect(damn.client.get.mock.calls[0]).toEqual(['feed/home', {}])
      expect(damn.client.get.mock.calls[1]).toEqual(['feed/home', qsPagination])
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

  describe('galleryAll(username)', () => {
    it('calls the endpoint', () => {
      const username = 'pqsdoqp'
      damn.client.get.mockReturnValue(Promise.resolve({ data: 'hey' }))

      damn.galleryAll(username)
      damn.galleryAll(username, qsPagination)

      expect(damn.client.get).toHaveBeenCalledTimes(2)
      expect(damn.client.get.mock.calls[0]).toEqual(['gallery/all', { username }])
      expect(damn.client.get.mock.calls[1]).toEqual(['gallery/all', Object.assign({ username }, qsPagination)])
    })

    it('returns a promise', () => {
      damn.client.get.mockReturnValue(Promise.resolve({}))

      const result = damn.galleryAll()

      expect(result).toBeInstanceOf(Promise)
    })

    it('returns a list of deviations', () => {
      const results = 'qlsdqlm'
      damn.client.get.mockReturnValue(Promise.resolve({ results }))

      expect(damn.galleryAll()).resolves.toBe(results)
    })
  })

  describe('galleryFolders(username)', () => {
    it('calls the endpoint', () => {
      const username = 'pqsdoqp'
      damn.client.get.mockReturnValue(Promise.resolve({ data: 'hey' }))

      damn.galleryFolders(username)
      damn.galleryFolders(username, qsPagination)

      expect(damn.client.get).toHaveBeenCalledTimes(2)
      expect(damn.client.get.mock.calls[0]).toEqual(['gallery/folders', { username }])
      expect(damn.client.get.mock.calls[1]).toEqual(['gallery/folders', Object.assign({ username }, qsPagination)])
    })

    it('returns a promise', () => {
      damn.client.get.mockReturnValue(Promise.resolve({}))

      const result = damn.galleryFolders()

      expect(result).toBeInstanceOf(Promise)
    })

    it('returns a list of folders', () => {
      const results = 'qlsdqlm'
      damn.client.get.mockReturnValue(Promise.resolve({ results }))

      expect(damn.galleryFolders()).resolves.toBe(results)
    })
  })

  describe('galleryFolder(folderId, username)', () => {
    it('calls the endpoint', () => {
      const folderId = 'ldmslqdm'
      const username = 'pqsdoqp'
      damn.client.get.mockReturnValue(Promise.resolve({ data: 'hey' }))

      damn.galleryFolder(folderId, username)
      damn.galleryFolder(folderId, username, qsPagination)

      expect(damn.client.get).toHaveBeenCalledTimes(2)
      expect(damn.client.get.mock.calls[0]).toEqual([`gallery/${folderId}`, { username }])
      expect(damn.client.get.mock.calls[1]).toEqual([`gallery/${folderId}`, Object.assign({ username }, qsPagination)])
    })

    it('returns a promise', () => {
      damn.client.get.mockReturnValue(Promise.resolve({}))

      const result = damn.galleryFolder()

      expect(result).toBeInstanceOf(Promise)
    })

    it('returns a list of deviations', () => {
      const results = 'qlsdqlm'
      damn.client.get.mockReturnValue(Promise.resolve({ results }))

      expect(damn.galleryFolder()).resolves.toBe(results)
    })
  })

  describe('userFriends(username)', () => {
    it('calls the endpoint', () => {
      const username = 'pqsdoqp'
      damn.client.get.mockReturnValue(Promise.resolve({ data: 'hey' }))

      damn.userFriends(username)
      damn.userFriends(username, qsPagination)

      expect(damn.client.get).toHaveBeenCalledTimes(2)
      expect(damn.client.get.mock.calls[0]).toEqual([`user/friends/${username}`, {}])
      expect(damn.client.get.mock.calls[1]).toEqual([`user/friends/${username}`, qsPagination])
    })

    it('returns a promise', () => {
      damn.client.get.mockReturnValue(Promise.resolve({}))

      const result = damn.userFriends()

      expect(result).toBeInstanceOf(Promise)
    })

    it('returns a list of friends', () => {
      const results = 'qlsdqlm'
      damn.client.get.mockReturnValue(Promise.resolve({ results }))

      expect(damn.userFriends()).resolves.toBe(results)
    })
  })

  describe('userFriendsSearch(username, query)', () => {
    it('calls the endpoint', () => {
      const username = 'pqsdoqp'
      const query = 'pqsdoqp'
      damn.client.get.mockReturnValue(Promise.resolve({ data: 'hey' }))

      damn.userFriendsSearch(username, query)

      expect(damn.client.get).toHaveBeenCalledTimes(1)
      expect(damn.client.get.mock.calls[0]).toEqual(['user/friends/search', { username, query }])
    })

    it('returns a promise', () => {
      damn.client.get.mockReturnValue(Promise.resolve({}))

      const result = damn.userFriendsSearch()

      expect(result).toBeInstanceOf(Promise)
    })

    it('returns a list of friends', () => {
      const results = 'qlsdqlm'
      damn.client.get.mockReturnValue(Promise.resolve({ results }))

      expect(damn.userFriendsSearch()).resolves.toBe(results)
    })
  })
})
