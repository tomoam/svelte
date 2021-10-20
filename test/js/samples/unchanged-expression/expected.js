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

const render = make_renderer(`<div><p>Hello world</p> <p>Hello <!></p> <p>Hello <!></p></div> <div><p>Hello <!></p></div>`);
const node_path = () => [,,1,1,,-1,5,1,,-1,-2,-1,,,-1];

function create_fragment(ctx) {
	let render_nodes = [];

	return {
		c() {
			traverse(render(), render_nodes, node_path());
			render_nodes[5] = replace_text(render_nodes[5], world1);
			render_nodes[9] = replace_text(render_nodes[9], world2);
			render_nodes[14] = replace_text(render_nodes[14], /*world3*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* div0 */
			insert(target, render_nodes[10], anchor); /* t7 */
			insert(target, render_nodes[11], anchor); /* div1 */
		},
		p(ctx, [dirty]) {
			if (dirty & /*world3*/ 1) set_data(render_nodes[14], /*world3*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* div0 */
			if (detaching) detach(render_nodes[10]); /* t7 */
			if (detaching) detach(render_nodes[11]); /* div1 */
		}
	};
}

let world1 = 'world';
let world2 = 'world';

function instance($$self, $$props, $$invalidate) {
	const world3 = 'world';

	function foo() {
		$$invalidate(0, world3 = 'svelte');
	}

	return [world3];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;