var assert = require('assert'),
	expect = require('chai').expect,
	dAmn = require('../index'),
	Client = require('../client'),
	params = require('./params');

describe('Client', function() {
	var dummyToken = 'abc123',
		publicClient, privateClient,
		badPublicClient, badPrivateClient;

	before(function(done) {
		this.timeout(4000);

		badPublicClient = new Client(dummyToken);
		badPrivateClient = new Client(dummyToken, true);

		dAmn.public(params.app.client_id, params.app.client_secret, function(err, daClient) {
			publicClient = daClient;

			dAmn.private(params.user.username, params.user.password, params.app.client_id, params.app.redirect_uri, function(err, daClient) {
				privateClient = daClient;

				done();
			})
		});
	});

	describe('constructor()', function() {
		it('should set an access token', function() {
			expect(badPublicClient).to.have.property('accessToken', dummyToken);
		});
		it('should set a `privateAccess` boolean', function() {
			expect(publicClient).to.have.property('privateAccess', false);
			expect(privateClient).to.have.property('privateAccess', true);
		});
		it('should set a `matureFilter` boolean', function() {
			expect(publicClient).to.have.property('matureFilter', true);
		});
	});

	describe('API calls', function() {
		describe('getDeviation(deviationId)', function() {

		});

		describe('getDeviationContent(deviationId)', function() {

		});

		describe('getMoreLike(deviationId)', function() {

		});

		describe('getNewest()', function() {

		});

		describe('getPopular()', function() {

		});

		describe('getWhatsHot()', function() {

		});

		describe('getDailyDeviations()', function() {
			it('should return a bunch of deviations', function(done) {
				publicClient.getDailyDeviations(function(err, data) {
					expect(err).to.be.null;
					expect(data).to.be.an.array;
					expect(data[0]).to.contain.keys('deviationid', 'url', 'title', 'author');
					done();
				});
			})
		});

		describe('getNotifications()', function() {

		});

		describe('placebo()', function() {
			it('should return a status string', function(done) {
				publicClient.placebo(function(err, data) {
					expect(err).to.be.null;
					expect(data).to.have.property('status', 'success');
					done();
				});
			});
		});
	});

	describe('Utils', function() {
		describe('checkAccessToken()', function() {
			it('should return `true` for a valid token', function(done) {
				publicClient.checkAccessToken(function(err, b) {
					expect(err).to.be.null;
					expect(b).to.be.a.boolean;
					expect(b).to.equal(true);
					done();
				})
			});

			it('should return `false` for an invalid token', function(done) {
				badPublicClient.checkAccessToken(function(err, b) {
					expect(err).to.be.null;
					expect(b).to.be.a.boolean;
					expect(b).to.equal(false);
					done();
				})
			});
		});
	});
});
