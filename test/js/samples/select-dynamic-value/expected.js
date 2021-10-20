/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	init,
	insert,
	make_renderer,
	noop,
	safe_not_equal,
	select_option,
	traverse
} from "svelte/internal";

const render = make_renderer(`<select><option value="1">1</option><option value="2">2</option></select>`);
const node_path = () => [,0,-1];

function create_fragment(ctx) {
	let render_nodes = [];

	return {
		c() {
			traverse(render(), render_nodes, node_path());
			render_nodes[1].__value = "1";
			render_nodes[1].value = render_nodes[1].__value;
			render_nodes[2].__value = "2";
			render_nodes[2].value = render_nodes[2].__value;
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* select */
			select_option(render_nodes[0], /*current*/ ctx[0]);
		},
		p(ctx, [dirty]) {
			if (dirty & /*current*/ 1) {
				select_option(render_nodes[0], /*current*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* select */
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { current } = $$props;

	$$self.$$set = $$props => {
		if ('current' in $$props) $$invalidate(0, current = $$props.current);
	};

	return [current];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { current: 0 });
	}
}

export default Component;