const should = require('should');

const randomizeLocation = require('../src');

describe('#randomizeLocation', function() {
	it('should not accept non numerical values for lat/long input', () => {
		should.throws(() => randomizeLocation(), Error);
		should.throws(() => randomizeLocation({lat: 0}));
		should.throws(() => randomizeLocation({long: 0}));
		should.throws(() => randomizeLocation({lat: '0', long: 0}));
		should.throws(() => randomizeLocation({lat: 0, long: '0'}));
	});
	
	it('should not alter the lat/long if a radius of 0 has been defined', () => {
		randomizeLocation({lat: 10, long: 20, radius: 0}).should.eql({lat: 10, long: 20});
	});
	
	it('should not alter the lat/long for a spread value of 0', () => {
		randomizeLocation({lat: 10, long: 20, spread: 0}).should.eql({lat: 10, long: 20});
	});
});