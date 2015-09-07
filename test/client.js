var assert = require('assert'),
	expect = require('chai').expect,
	Client = require('../client');

describe('Client', function() {
	var publicClient, privateClient;

	beforeEach(function() {
		publicClient = new Client('abc123');
		privateClient = new Client('abc123', true);
	});

	describe('constructor()', function() {
		it('should set an access token', function() {
			expect(publicClient).to.have.property('accessToken');
			expect(publicClient.accessToken).to.equal('abc123');
		});
		it('should set a `privateAccess` boolean', function() {
			expect(publicClient).to.have.property('privateAccess');
			expect(publicClient.privateAccess).to.equal(false);
			expect(privateClient).to.have.property('privateAccess');
			expect(privateClient.privateAccess).to.equal(true);
		});
		it('should set a `matureFilter` boolean', function() {
			expect(publicClient).to.have.property('matureFilter');
			expect(publicClient.matureFilter).to.equal(true);
		});
	});

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

	});

	describe('getNotifications()', function() {

	});

	describe('placebo()', function() {

	});
});
