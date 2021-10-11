/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	component_subscribe,
	detach,
	init,
	insert,
	make_renderer,
	noop,
	safe_not_equal,
	set_data,
	traverse
} from "svelte/internal";

import { writable } from 'svelte/store';
const render = make_renderer(`<h1> </h1>`);
const node_path = () => [0,0];

function create_fragment(ctx) {
	let render_nodes = [];

	return {
		c() {
			traverse(render(), render_nodes, node_path());
			render_nodes[1].data = /*$foo*/ ctx[0];
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* h1 */
		},
		p(ctx, [dirty]) {
			if (dirty & /*$foo*/ 1) set_data(render_nodes[1], /*$foo*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* h1 */
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $foo;
	const foo = writable(0);
	component_subscribe($$self, foo, value => $$invalidate(0, $foo = value));
	return [$foo, foo];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;