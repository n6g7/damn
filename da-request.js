module.exports = require('request').defaults({
	baseUrl: 'https://www.deviantart.com/',
	headers: {
		Origin: 'http://www.deviantart.com',
		'User-Agent': 'damn'
	},
	jar: true,
	json: true,
	followRedirect: false
});
