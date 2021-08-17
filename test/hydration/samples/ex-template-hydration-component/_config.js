export default {
	compileOptions: {
		generate: "template",
	},

	snapshot(target) {
		const p = target.querySelector('p');

		return {
			p,
			text: p.childNodes[0]
		};
	},

	test(assert, target, snapshot) {
		const p = target.querySelector('p');

		assert.equal(p, snapshot.p);
		assert.equal(p.childNodes[0], snapshot.text);
	}
};
