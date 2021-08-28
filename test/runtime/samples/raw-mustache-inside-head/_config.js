export default {
	async test({ assert, target, window }) {
		const btn = target.querySelector('button');
		const clickEvent = new window.MouseEvent('click');

		const ex_template_mode = Boolean(process.env.SVELTE_EX_TEMPLATE_MODE);

		const comment = '<!---->';
		const blue = '<style>body { color: blue; }</style>';
		const green = '<style>body { color: green; }</style>';
		const red = '<style>body { color: red; }</style>';

		const expected_1 = ex_template_mode ? `${blue}${comment}${green}` : `${blue}${green}`;
		assert.equal(window.document.head.innerHTML.includes(expected_1), true);

		await btn.dispatchEvent(clickEvent);

		const expected_2 = ex_template_mode ? `${red}${comment}${green}` : `${red}${green}`;
		assert.equal(window.document.head.innerHTML.includes(expected_2), true);

		await btn.dispatchEvent(clickEvent);

		const expected_3 = ex_template_mode ? `${blue}${comment}${green}` : `${blue}${green}`;
		assert.equal(window.document.head.innerHTML.includes(expected_3), true);
	}
};
