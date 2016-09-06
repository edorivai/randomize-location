/* eslint-disable vars-on-top */
const assign = require('object-assign');

/*
 * Returns the number if a numerical value has been passed
 */
function defaultNumber(value, defaultValue) {
	return typeof value === 'number' ? value : defaultValue;
}

/**
 * Randomizes a location within the specified randomization radius.
 * @param {Object} options
 * @param {number} options.lat - The latitude of the location that is to be randomized
 * @param {number} options.long - The longitude of the location that is to be randomized
 * @param {number} options.radius - The radius in meters within which the randomized location
 *   will be generated
 * @param {number} [options.rand1=Math.random()] - ?
 * @param {number} [options.rand2=Math.random()] - ?
 * @param {number} options.minOffset - The minimal distance the randomized point
 *   should be from the passed latitude and longitude
 * @returns {Object} object with randomized lat and long
 */
function randomizeLocation(options) {
	var opts = assign({}, options, {
		minOffset: defaultNumber(options.minOffset, 0),
		radius: defaultNumber(options.radius, 100),
		rand1: defaultNumber(options.rand1, Math.random()),
		rand2: defaultNumber(options.rand2, Math.random())
	});

	if (typeof opts.lat !== 'number') {
		throw new Error('Invalid latitude, expecting a number, got ' + String(typeof opts.lat));
	}
	if (typeof opts.long !== 'number') {
		throw new Error('Invalid longitude, expecting a number, got ' + String(typeof opts.long));
	}

	var minOffsetFactor = opts.minOffset / opts.radius;
	var minRadius = (opts.radius * (1 - minOffsetFactor)) + opts.minOffset; // ensure min offset
	var	w = (minRadius / 111300) * Math.sqrt(opts.rand1); // random radius offset
	var angle = 2 * Math.PI * opts.rand2; // random, circle angle
	var uncompXOffset = w * Math.cos(angle); // long offset
	var yOffset = w * Math.sin(angle); // lat offset
	var xOffset = uncompXOffset / Math.cos(opts.lat); // compensate for longitude shrinkage

	return { lat: opts.lat + yOffset, long: opts.long + xOffset };
}

module.exports = randomizeLocation;
