export default {
	show: true,
	test(assert, target, snapshot, component, window) {
		assert.equal(window.document.querySelectorAll('meta').length, 2);
	}
};
