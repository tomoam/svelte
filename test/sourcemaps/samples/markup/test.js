export function test({ assert, input, js }) {
	let expected;

	let start;
	let actual;

	start = js.locate('insert(target, render_nodes[0]');
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

	start = js.locate('insert(target, render_nodes[2]');
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
