const HttpClient = require('./client')

class Damn {
  constructor (accessToken) {
    this.client = new HttpClient(accessToken)
  }

  getDailyDeviations () {
    return this.client
      .get('browse/dailydeviations')
      .then(data => data.results)
  }

  getDeviation (deviationId) {
    return this.client
      .get(`deviation/${deviationId}`)
  }

  getNotifications () {
    return this.client
      .get('feed/notifications')
      .then(data => data.items)
  }

  getWatchFeed () {
    return this.client
      .get('feed/home')
      .then(data => data.items)
  }

  placebo () {
    return this.client
      .get('placebo')
  }

  checkAccessToken () {
    return this.placebo().then(data => data.status === 'success')
  }

  galleryAll (username) {
    return this.client
      .get('gallery/all', { username })
      .then(data => data.results)
  }

  galleryFolders (username) {
    return this.client
      .get('gallery/folders', { username })
      .then(data => data.results)
  }

  galleryFolder (folderId, username) {
    return this.client
      .get(`gallery/${folderId}`, { username })
      .then(data => data.results)
  }
}

module.exports = Damn
