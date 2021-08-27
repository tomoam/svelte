/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	create_component,
	destroy_component,
	detach,
	init,
	insert_experimental,
	make_renderer,
	mount_component,
	noop,
	safe_not_equal,
	transition_in,
	transition_out
} from "svelte/internal";

import Imported from 'Imported.svelte';
const render = make_renderer(`<!> <!>`);

function create_fragment(ctx) {
	let imported;
	let imported_anchor;
	let t;
	let nonimported;
	let nonimported_anchor;
	let current;
	imported = new Imported({});
	nonimported = new NonImported({});

	return {
		c() {
			create_component(imported.$$.fragment);
			imported_anchor = render().firstChild;
			t = imported_anchor.nextSibling;
			create_component(nonimported.$$.fragment);
			nonimported_anchor = t.nextSibling;
		},
		m(target, anchor) {
			mount_component(imported, target, anchor);
			insert_experimental(target, t, anchor);
			mount_component(nonimported, target, anchor);
			insert_experimental(target, nonimported_anchor, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(imported.$$.fragment, local);
			transition_in(nonimported.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(imported.$$.fragment, local);
			transition_out(nonimported.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(imported, detaching);
			if (detaching) detach(t);
			if (detaching) detach(nonimported_anchor);
			destroy_component(nonimported, detaching);
		}
	};
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {});
	}
}

export default Component;