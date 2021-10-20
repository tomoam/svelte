export default {
	props: {
		raw: '<span>foo</span>'
	},

	test({ assert, component, target }) {
		const span = target.querySelector('span');
		assert.equal(span.nextSibling.nodeName, '#comment');
		assert.ok(!span.nextSibling.nextSibling);

		component.raw = '<span>bar</span>';
	}
};
