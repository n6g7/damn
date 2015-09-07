var request = require('request');

function daRequest() {
	var jar = request.jar(),
		res;

	res = request.defaults({
		baseUrl: 'https://www.deviantart.com/',
		headers: {
			Origin: 'http://www.deviantart.com',
			'User-Agent': 'damn'
		},
		jar: jar,
		json: true,
		followRedirect: false
	});

	res.jar = jar;
	return res;
}

module.exports = daRequest;
