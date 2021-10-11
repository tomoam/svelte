/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	init,
	insert,
	make_renderer,
	noop,
	replace_text,
	safe_not_equal,
	set_data,
	traverse
} from "svelte/internal";

const render = make_renderer(`<p>x: <!></p>`);
const node_path = () => [0,0,2];

function create_fragment(ctx) {
	let render_nodes = [];

	return {
		c() {
			traverse(render(), render_nodes, node_path());
			render_nodes[2] = replace_text(render_nodes[2], /*x*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* p */
		},
		p(ctx, [dirty]) {
			if (dirty & /*x*/ 1) set_data(render_nodes[2], /*x*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* p */
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let x = 0;
	let y = 1;
	x += 1;

	{
		x += 2;
	}

	setTimeout(
		function foo() {
			$$invalidate(0, x += 10);
			$$invalidate(1, y += 20);
		},
		1000
	);

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*x, y*/ 3) {
			$: $$invalidate(0, x += y);
		}
	};

	return [x, y];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;