export default {
	options: {
		// hydrate: false // Hydration test will fail as case sensitivity is only handled for svg elements.
	},
	// skip_if_hydrate_from_ssr: true,
	compileOptions: {
		generate: "template" 
	},

	html: '<div style="color: red;">red</div>',

	test({ assert, component, target }) {
		const div = target.querySelector( 'div' );

		assert.equal( div.style.color, 'red' );

		component.color = 'blue';
		assert.equal( target.innerHTML, '<div style="color: blue;">blue</div>' );
		assert.equal( div.style.color, 'blue' );
	}
};
