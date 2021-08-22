/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	first_child,
	init,
	insert_experimental,
	make_renderer,
	noop,
	safe_not_equal,
	set_style
} from "svelte/internal";

const render = make_renderer(`<div></div>`);

function create_fragment(ctx) {
	let div;

	return {
		c() {
			div = first_child(render());
			set_style(div, "color", color);
		},
		m(target, anchor) {
			insert_experimental(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

let color = 'red';

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {});
	}
}

export default Component;