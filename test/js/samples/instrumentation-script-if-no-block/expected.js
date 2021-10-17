/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	init,
	insert,
	listen,
	make_renderer,
	noop,
	replace_text,
	safe_not_equal,
	set_data,
	traverse
} from "svelte/internal";

const render = make_renderer(`<button>foo</button> <p>x: <!></p>`);
const node_path = () => [,-1,-1,,-1];

function create_fragment(ctx) {
	let render_nodes = [];
	let mounted;
	let dispose;

	return {
		c() {
			traverse(render(), render_nodes, node_path());
			render_nodes[4] = replace_text(render_nodes[4], /*x*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* button */
			insert(target, render_nodes[1], anchor); /* t1 */
			insert(target, render_nodes[2], anchor); /* p */

			if (!mounted) {
				dispose = listen(render_nodes[0], "click", /*foo*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*x*/ 1) set_data(render_nodes[4], /*x*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* button */
			if (detaching) detach(render_nodes[1]); /* t1 */
			if (detaching) detach(render_nodes[2]); /* p */
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let x = 0;

	function foo() {
		if (true) $$invalidate(0, x += 1);
	}

	return [x, foo];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;