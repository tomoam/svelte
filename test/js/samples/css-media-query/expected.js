/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	append_styles,
	detach,
	init,
	insert,
	make_renderer,
	noop,
	safe_not_equal
} from "svelte/internal";

function add_css(target) {
	append_styles(target, "svelte-1slhpfn", "@media(min-width: 1px){div.svelte-1slhpfn{color:red}}");
}

const render = make_renderer(`<div class="svelte-1slhpfn"></div>`);

function create_fragment(ctx) {
	let div;

	return {
		c() {
			div = render().firstChild;
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {}, add_css);
	}
}

export default Component;