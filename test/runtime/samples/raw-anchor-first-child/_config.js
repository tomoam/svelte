export default {
	props: {
		raw: '<span>foo</span>'
	},

	test({ assert, component, target }) {
		const span = target.querySelector('span');
		assert.ok(!span.previousSibling || span.previousSibling.nodeType === 8 || (span.previousSibling.nodeType === 3 && span.previousSibling.data === ''));

		component.raw = '<span>bar</span>';
		assert.htmlEqual(target.innerHTML, '<div><span>bar</span></div>');
	}
};
