/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	children,
	claim_element_experimental,
	claim_text_experimental,
	detach,
	init,
	insert_experimental_hydration,
	make_renderer,
	noop,
	safe_not_equal,
	trim_nodes
} from "svelte/internal";

const render = make_renderer(`<svg><title>a title</title></svg>`);

function create_fragment(ctx) {
	let svg;
	let title;
	let t;

	return {
		c() {
			svg = render().firstChild;
			title = svg.firstChild;
			t = title.firstChild;
		},
		l(nodes) {
			this.c();
			if (!nodes.length) return;
			svg = claim_element_experimental(svg, nodes);
			var svg_nodes = children(svg);
			title = claim_element_experimental(title, svg_nodes, svg);
			t = claim_text_experimental(t, trim_nodes(children(title)), title);
		},
		m(target, anchor) {
			insert_experimental_hydration(target, svg, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
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