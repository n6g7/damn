'use strict';

var daRequest = require('./da-request'),
	apiDebug = require('debug')('da:api'),
	tokenDebug = require('debug')('da:token'),
	ddDebug = require('debug')('da:dd');

class Client {
	constructor(accessToken, privateAccess) {
		this.accessToken = accessToken;
		this.privateAccess = privateAccess || false;

		this.matureFilter = true;

		this.request = daRequest().defaults({
			baseUrl: 'https://www.deviantart.com/api/oauth2',
			qs: {
				access_token: this.accessToken
			}
		});
	}

	// API calls

	getDailyDeviations(cb) {
		this.request({
			url: '/browse/dailydeviations',
			qs: {
				mature_content: !this.matureFilter
			}
		}, function(err, res, body) {
			return cb(err, body.results);
		});
	}

	getNotifications(cb) {
		this.request('/feed/notifications', function(err, res, body) {
			return cb(err, body.items);
		});
	}

	getWatchFeed(cb) {
		this.request('/feed/home', function(err, res, body) {
			return cb(err, body.items);
		});
	}

	placebo(cb) {
		this.request('/placebo', function(err, res, body) {
			return cb(err, body);
		});
	}

	// Utils

	checkAccessToken(cb) {
		this.placebo(function(err, data) {
			cb(err, data.status === "success");
		});
	}
}

module.exports = Client;
