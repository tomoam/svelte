const message = 'the quick brown fox jumps over the lazy dog';
const expected = [...message].map(c => `<span>${c + ' '}</span>`).join('');

export default {
	props: {
		message
	},

	async test({ assert, target }) {
		const firstSpanList = target.children[0];
		assert.htmlEqual(firstSpanList.innerHTML, expected);

		const secondSpanList = target.children[1];
		assert.htmlEqual(secondSpanList.innerHTML, expected);
	}
};
