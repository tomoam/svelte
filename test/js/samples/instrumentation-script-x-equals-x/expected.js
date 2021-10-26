/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach_all,
	init,
	insert_all,
	listen,
	make_renderer,
	noop,
	replace_text,
	safe_not_equal,
	set_data,
	traverse
} from "svelte/internal";

const render = make_renderer(`<button>foo</button> <p>number of things: <!></p>`);
const node_path = () => [,1,1,,1];

function create_fragment(ctx) {
	let render_nodes = [];
	let t3_value = /*things*/ ctx[0].length + "";
	let mounted;
	let dispose;

	return {
		c() {
			traverse(render(), render_nodes, node_path());
			render_nodes[4] = replace_text(render_nodes[4], t3_value);
		},
		m(target, anchor) {
			insert_all(target, render_nodes, [0,1,2], anchor);

			if (!mounted) {
				dispose = listen(render_nodes[0], "click", /*foo*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*things*/ 1 && t3_value !== (t3_value = /*things*/ ctx[0].length + "")) set_data(render_nodes[4], t3_value);
		},
		i: noop,
		o: noop,
		d(detaching) {
			detach_all(detaching, render_nodes, [0,1,2]);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let things = [];

	function foo() {
		things.push(1);
		$$invalidate(0, things);
	}

	return [things, foo];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;