var daRequest = require('./da-request'),
	apiDebug = require('debug')('da:api'),
	tokenDebug = require('debug')('da:token'),
	ddDebug = require('debug')('da:dd');

function Client(accessToken, privateAccess) {
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
Client.prototype.getDailyDeviations = function(cb) {
	this.request({
		url: '/browse/dailydeviations',
		qs: {
			mature_content: !this.matureFilter
		}
	}, function(err, res, body) {
		return cb(err, body.results);
	});
};

Client.prototype.placebo = function(cb) {
	this.request('/placebo', function(err, res, body) {
		return cb(err, body);
	});
};

// Utils
Client.prototype.checkAccessToken = function(cb) {
	this.placebo(function(err, data) {
		cb(err, data.status === "success");
	});
};

module.exports = Client;
