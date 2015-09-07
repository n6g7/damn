var assert = require('assert'),
	expect = require('chai').expect,
	dAmn = require('../index'),
	params = require('./params');

describe('Client generation', function() {
	describe('Client Credentials', function() {
		it('should return a Client instance', function(done) {
			dAmn.public(params.app.client_id, params.app.client_secret, function(err, daClient) {
				if (err) return done(err);

				expect(daClient).to.have.property('accessToken');
				expect(daClient.accessToken).to.be.a.string;
				expect(daClient).to.have.property('privateAccess');
				expect(daClient.privateAccess).to.equal(false);
				done();
			});
		});
	});
	describe('Implicit', function() {
		it('should return a Client instance', function(done) {
			this.timeout(3000);

			dAmn.private(params.user.username, params.user.password, params.app.client_id, params.app.redirect_uri, function(err, daClient) {
				if (err) return done(err);

				expect(daClient).to.have.property('accessToken');
				expect(daClient.accessToken).to.be.a.string;
				expect(daClient).to.have.property('privateAccess');
				expect(daClient.privateAccess).to.equal(true);
				done();
			});
		});
	});
});
