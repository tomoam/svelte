export default {
	async test({ assert, target, window }) {
		const btn = target.querySelector('button');
		const clickEvent = new window.MouseEvent('click');

		const comment = '<!---->';
		const blue = '<style>body { color: blue; }</style>';
		const green = '<style>body { color: green; }</style>';
		const red = '<style>body { color: red; }</style>';

		const expected_1 = `${blue}${comment}${green}`;
		assert.equal(window.document.head.innerHTML.includes(expected_1), true);

		await btn.dispatchEvent(clickEvent);

		const expected_2 = `${red}${comment}${green}`;
		assert.equal(window.document.head.innerHTML.includes(expected_2), true);

		await btn.dispatchEvent(clickEvent);

		const expected_3 = `${blue}${comment}${green}`;
		assert.equal(window.document.head.innerHTML.includes(expected_3), true);
	}
};
