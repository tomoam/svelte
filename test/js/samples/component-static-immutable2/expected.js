/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	create_component,
	destroy_component,
	detach,
	init,
	insert,
	make_renderer,
	mount_component,
	noop,
	not_equal,
	transition_in,
	transition_out
} from "svelte/internal";

const render = make_renderer(`<!>`);

function create_fragment(ctx) {
	let nested;
	let nested_anchor;
	let current;
	nested = new /*Nested*/ ctx[0]({ props: { foo: "bar" } });

	return {
		c() {
			create_component(nested.$$.fragment);
			nested_anchor = render().firstChild;
		},
		m(target, anchor) {
			mount_component(nested, target, anchor);
			insert(target, nested_anchor, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(nested.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(nested.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(nested_anchor);
			destroy_component(nested, detaching);
		}
	};
}

function instance($$self) {
	const Nested = window.Nested;
	return [Nested];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, not_equal, {});
	}
}

export default Component;