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
	run_all,
	safe_not_equal,
	set_data,
	traverse
} from "svelte/internal";

const render = make_renderer(`<input> <h1><!>!</h1>`);
const node_path = () => [,1,1,0,-1];

function create_fragment(ctx) {
	let render_nodes = [];
	let mounted;
	let dispose;

	return {
		c() {
			traverse(render(), render_nodes, node_path());
			render_nodes[3] = replace_text(render_nodes[3], /*name*/ ctx[0]);
			render_nodes[0].value = /*name*/ ctx[0];
		},
		m(target, anchor) {
			insert_all(target, render_nodes, [0,1,2], anchor);

			if (!mounted) {
				dispose = listen(render_nodes[0], "input", /*onInput*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*name*/ 1 && render_nodes[0].value !== /*name*/ ctx[0]) {
				render_nodes[0].value = /*name*/ ctx[0];
			}

			if (dirty & /*name*/ 1) set_data(render_nodes[3], /*name*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			detach_all(detaching, render_nodes, [0,1,2]);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let name = 'change me';

	function onInput(event) {
		$$invalidate(0, name = event.target.value);
	}

	return [name, onInput];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;
