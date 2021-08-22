export function test({ assert, input, js, config }) {
	let expected;

	let start;
	let actual;

	const experimental_template_mode = config.compile_options && config.compile_options.experimental_template_mode;
	if (experimental_template_mode) {
		start = js.locate('insert_experimental(target, h1');
	} else {
		start = js.locate('insert(target, h1');
	}
	expected = input.locate('<h1');
	actual = js.mapConsumer.originalPositionFor({
		line: start.line + 1,
		column: start.column
	});

	assert.deepEqual(actual, {
		source: 'input.svelte',
		name: null,
		line: expected.line + 1,
		column: expected.column
	});

	if (experimental_template_mode) {
		start = js.locate('insert_experimental(target, div');
	} else {
		start = js.locate('insert(target, h1');
	}
	expected = input.locate('<div');
	actual = js.mapConsumer.originalPositionFor({
		line: start.line + 1,
		column: start.column
	});

	assert.deepEqual(actual, {
		source: 'input.svelte',
		name: null,
		line: expected.line + 1,
		column: expected.column
	});
}
