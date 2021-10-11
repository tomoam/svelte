export default {
	props: {
		raw: '<span>foo</span>'
	},

	test({ assert, component, target }) {
		const span = target.querySelector('span');
		assert.equal(span.previousSibling.nodeName, 'BR');
		assert.equal(span.nextSibling.nodeName, '#comment');

		component.raw = '<span>bar</span>';
	}
};
