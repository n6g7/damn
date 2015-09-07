var daRequest = require('./da-request'),
	Client = require('./client');

function clientCredentials(clientId, clientSecret, cb) {
	var request = daRequest();

	request({
		url: '/oauth2/token',
		qs: {
			grant_type: 'client_credentials',
			client_id: clientId,
			client_secret: clientSecret
		}
	}, function(err, response, body) {
		if (err) return cb(err);

		return cb(null, new Client(body.access_token));
	});
}

function implicit(username, password, clientId, redirectUri, cb) {
	var request = daRequest();

	// Get CSRF token
	request('/users/rockedout', function(err, res, body) {
		if (err) return cb(err);

		var validateToken = /name="validate_token" value="([0-9a-f]+)"/.exec(body)[1],
			validateKey = /name="validate_key" value="([0-9a-f]+)"/.exec(body)[1];

		// Login
		request({
			method: 'POST',
			url: '/users/login',
			form: {
				ref: 'https://www.deviantart.com/users/rockedout',
				username: username,
				password: password,
				remember_me: 0,
				validate_token: validateToken,
				validate_key: validateKey
			}
		}, function(err, res, body) {
			if (err) return cb(err);

			var state = Math.random()*100;

			// Get access token
			request({
				url: '/oauth2/authorize',
				qs: {
					response_type: 'token',
					client_id: clientId,
					redirect_uri: redirectUri,
					state: state,
					scope: 'basic'
				}
			}, function(err, res, body) {
				if (err) return cb(err);

				var accessToken = /access_token=([0-9a-f]+)&/.exec(res.headers.location)[1];

				return cb(null, new Client(accessToken, true));
			});
		});
	});
}

module.exports = {
	client: Client,
	private: implicit,
	public: clientCredentials
};
