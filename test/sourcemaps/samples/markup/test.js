export function test({ assert, input, js, config }) {
	let expected;

	let start;
	let actual;

	const template = config.compile_options && config.compile_options.experimental && config.compile_options.experimental.template;
	if (template) {
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

	if (template) {
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
