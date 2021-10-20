/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	add_render_callback,
	create_in_transition,
	detach,
	init,
	insert,
	make_renderer,
	noop,
	safe_not_equal,
	transition_in,
	traverse
} from "svelte/internal";

const render_1 = make_renderer(`<!>`);

// (8:0) {#if x}
function create_if_block(ctx) {
	let render_nodes = [];
	let if_block = /*y*/ ctx[1] && create_if_block_1(ctx);

	return {
		c() {
			traverse(render_1(), render_nodes);
			if (if_block) if_block.c();
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* if_block */
			if (if_block) if_block.m(target, render_nodes[0]);
		},
		p(ctx, dirty) {
			if (/*y*/ ctx[1]) {
				if (if_block) {
					if (dirty & /*y*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(render_nodes[0].parentNode, render_nodes[0]);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* if_block */
			if (if_block) if_block.d(detaching);
		}
	};
}

const render = make_renderer(`<div>...</div>`);

// (9:1) {#if y}
function create_if_block_1(ctx) {
	let render_nodes = [];
	let div_intro;

	return {
		c() {
			traverse(render(), render_nodes);
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* div */
		},
		i(local) {
			if (local) {
				if (!div_intro) {
					add_render_callback(() => {
						div_intro = create_in_transition(render_nodes[0], foo, {});
						div_intro.start();
					});
				}
			}
		},
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* div */
		}
	};
}

const render_2 = make_renderer(`<!>`);

function create_fragment(ctx) {
	let render_nodes = [];
	let if_block = /*x*/ ctx[0] && create_if_block(ctx);

	return {
		c() {
			traverse(render_2(), render_nodes);
			if (if_block) if_block.c();
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* if_block */
			if (if_block) if_block.m(target, render_nodes[0]);
		},
		p(ctx, [dirty]) {
			if (/*x*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(render_nodes[0].parentNode, render_nodes[0]);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* if_block */
			if (if_block) if_block.d(detaching);
		}
	};
}

function foo() {
	
}

function instance($$self, $$props, $$invalidate) {
	let { x } = $$props;
	let { y } = $$props;

	$$self.$$set = $$props => {
		if ('x' in $$props) $$invalidate(0, x = $$props.x);
		if ('y' in $$props) $$invalidate(1, y = $$props.y);
	};

	return [x, y];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { x: 0, y: 1 });
	}
}

export default Component;