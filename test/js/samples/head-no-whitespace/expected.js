/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	append,
	detach,
	init,
	make_renderer,
	noop,
	safe_not_equal,
	traverse
} from "svelte/internal";

const render = make_renderer(`<meta name="twitter:creator" content="@sveltejs"><meta name="twitter:title" content="Svelte">`);
const node_path = () => [,1];

function create_fragment(ctx) {
	let render_nodes = [];

	return {
		c() {
			traverse(render(), render_nodes, node_path());
		},
		m(target, anchor) {
			append(document.head, render_nodes[0]);
			append(document.head, render_nodes[1]);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			detach(render_nodes[0]); /* meta0 */
			detach(render_nodes[1]); /* meta1 */
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