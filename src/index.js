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
	var opts = {};
	if (options && typeof options === 'object') {
		opts = JSON.parse(JSON.stringify(options));
	}
	if (typeof options.lat !== 'number') {
		throw new Error('Invalid latitude');
	}
	if (typeof options.long !== 'number') {
		throw new Error('Invalid longitude');
	}

	var radius = (opts.radius || 100) / 111300; // Defaults to 100 meters
	var spread = opts.spread || Math.random();
	var angle = opts.angle || Math.random();
	var	w = radius * Math.sqrt(spread);
	var rAngle = 2 * Math.PI * angle;
	var x = w * Math.cos(rAngle);
	var ryOffset = w * Math.sin(rAngle);
	var rxOffset = x / Math.cos(opts.lat);

	return { lat: opts.lat + ryOffset, long: opts.long + rxOffset };
}

module.exports = randomizeLocation;
