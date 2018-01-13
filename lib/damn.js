const HttpClient = require('./client')

class Damn {
  constructor (accessToken) {
    this.client = new HttpClient(accessToken)
  }

  getDailyDeviations (qs) {
    return this.client
      .get('browse/dailydeviations', Object.assign({}, qs))
      .then(data => data.results)
  }

  getDeviation (deviationId, qs) {
    return this.client
      .get(`deviation/${deviationId}`, Object.assign({}, qs))
  }

  getNotifications (qs) {
    return this.client
      .get('feed/notifications', Object.assign({}, qs))
      .then(data => data.items)
  }

  getWatchFeed (qs) {
    return this.client
      .get('feed/home', Object.assign({}, qs))
      .then(data => data.items)
  }

  placebo () {
    return this.client
      .get('placebo')
  }

  checkAccessToken () {
    return this.placebo()
      .then(data => data.status === 'success')
  }

  galleryAll (username, qs) {
    return this.client
      .get('gallery/all', Object.assign({ username }, qs))
      .then(data => data.results)
  }

  galleryFolders (username, qs) {
    return this.client
      .get('gallery/folders', Object.assign({ username }, qs))
      .then(data => data.results)
  }

  galleryFolder (folderId, username, qs) {
    return this.client
      .get(`gallery/${folderId}`, Object.assign({ username }, qs))
      .then(data => data.results)
  }

  userFriends (username, qs) {
    return this.client
      .get(`user/friends/${username}`, Object.assign({}, qs))
      .then(data => data.results || Promise.reject(data))
  }

  userFriendsSearch (username, query) {
    return this.client
      .get(`user/friends/search`, { username, query })
      .then(data => data.results || Promise.reject(data.error))
  }
}

module.exports = Damn
