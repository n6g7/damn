var DA = require('./index'),
	params = require('./params');

// Client Credentials (public) tests
DA.public(params.app.client_id, params.app.client_secret, function(err, daClient) {
	console.log(err || daClient);
});

// Implicit (private) tests
DA.private(params.user.username, params.user.password, params.app.client_id, params.app.redirect_uri, function(err, daClient) {
	console.log(err || daClient);
});
