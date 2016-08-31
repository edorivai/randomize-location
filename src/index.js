/**
 * Randomizes a location within the specified randomization radius.
 * @param {Object} options
 * @param {number} options.lat - The latitude of the location that is to be randomized
 * @param {number} options.long - The longitude of the location that is to be randomized
 * @param {number} options.r - The radius in meters within which the randomized location
 *   will be generated.
 * @param {number} [options.u=Math.random()] - The random variable determines the distance
 *   from the original location
 * @param {number} [options.v=Math.random()] - The random variable that determines
 *   the angle relative to the location
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

	var r = (opts.r || 100) / 111300; // Defaults to 100 meters
	var u = opts.u || Math.random();
	var v = opts.v || Math.random();
	var	w = r * Math.sqrt(u);
	var t = 2 * Math.PI * v;
	var x = w * Math.cos(t);
	var y1 = w * Math.sin(t);
	var x1 = x / Math.cos(opts.lat);

	return { lat: opts.lat + y1, long: opts.long + x1 };
}

module.exports = randomizeLocation;
