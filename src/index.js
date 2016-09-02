const assign = require('object-assign');

/**
 * Randomizes a location within the specified randomization radius.
 * @param {Object} options
 * @param {number} options.lat - The latitude of the location that is to be randomized
 * @param {number} options.long - The longitude of the location that is to be randomized
 * @param {number} options.radius - The radius in meters within which the randomized location
 *   will be generated.
 * @param {number} [options.spread=Math.random()] - The random variable determines the distance
 *   from the original location
 * @param {number} [options.angle=Math.random()] - The random variable that determines
 *   the angle relative to the location
 * @param {number} options.minOffset - The minimal distance the randomized point
 *   should be from the passed latitude and longitude
 * @returns {Object} object with randomized lat and long
 */
function randomizeLocation(options) {
	var opts = assign({}, options, {
		radius: defaultNumber(options.radius, 100),
		spread: defaultNumber(options.spread, Math.random()),
		angle: defaultNumber(options.angle, Math.random())
	});
	
	if (typeof opts.lat !== 'number') {
		throw new Error('Invalid latitude, expecting a number, got ' + (typeof opts.lat));
	}
	if (typeof opts.long !== 'number') {
		throw new Error('Invalid longitude, expecting a number, got ' + (typeof opts.long));
	}

	var	w = (opts.radius / 111300) * Math.sqrt(opts.spread);
	var rAngle = 2 * Math.PI * opts.angle;
	var x = w * Math.cos(rAngle);
	var ryOffset = w * Math.sin(rAngle);
	var rxOffset = x / Math.cos(opts.lat);

	return { lat: opts.lat + ryOffset, long: opts.long + rxOffset };
}

// Returns the number if a numerical value has been passed
function defaultNumber(value, defaultValue) {
	return typeof value === 'number' ? value : defaultValue;
}

module.exports = randomizeLocation;
