const test = require('ava');
const randomizeLocation = require('../src/index');

test('should throw if lat or long is not a number', t => {
	t.throws(() => { randomizeLocation({ lat: 4, long: '52' }); });
	t.throws(() => { randomizeLocation({ lat: '4', long: 52 }); });
});

test('should throw if lat or long is omitted', t => {
	t.throws(() => { randomizeLocation({}); });
	t.throws(() => { randomizeLocation({ lat: 4.1415926 }); });
	t.throws(() => { randomizeLocation({ long: 4.1415926 }); });
	/* alternative */
	// t.plan(3);
	// const badInputs = [{}, { lat: 4 }, { long: 52 }];
	// badInputs.forEach(badInput => {
	// 	t.throws(() => { randomizeLocation(badInput); });
	// });
});

test('should not alter the lat/long if a radius of 0 has been defined', t => {
	t.deepEqual(
		randomizeLocation({ lat: 10, long: 20, radius: 0 }),
		{ lat: 10, long: 20 }
	);
});

test.todo('should add a random offset');
test.todo('should add a random offset with a minimal offset');
