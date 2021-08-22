/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	first_child,
	init,
	insert_experimental,
	make_renderer,
	next_sibling,
	noop,
	replace_text,
	safe_not_equal
} from "svelte/internal";

const render = make_renderer(`<h1>Hello <!>!</h1>`);

function create_fragment(ctx) {
	let h1;
	let t0;
	let t1;

	return {
		c() {
			h1 = first_child(render());
			t0 = first_child(h1);
			t1 = replace_text(next_sibling(t0), name);
		},
		m(target, anchor) {
			insert_experimental(target, h1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(h1);
		}
	};
}

let name = 'world';

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {});
	}
}

export default Component;