/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	init,
	insert,
	make_renderer,
	noop,
	safe_not_equal,
	traverse
} from "svelte/internal";

const render_1 = make_renderer(`<p>not foo!</p>`);

// (7:0) {:else}
function create_else_block(ctx) {
	let render_nodes = [];

	return {
		c() {
			traverse(render_1(), render_nodes);
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* p */
		},
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* p */
		}
	};
}

const render = make_renderer(`<p>foo!</p>`);

// (5:0) {#if foo}
function create_if_block(ctx) {
	let render_nodes = [];

	return {
		c() {
			traverse(render(), render_nodes);
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* p */
		},
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* p */
		}
	};
}

const render_2 = make_renderer(`<!>`);

function create_fragment(ctx) {
	let render_nodes = [];

	function select_block_type(ctx, dirty) {
		if (/*foo*/ ctx[0]) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	return {
		c() {
			traverse(render_2(), render_nodes);
			if_block.c();
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* if_block */
			if_block.m(target, render_nodes[0]);
		},
		p(ctx, [dirty]) {
			if (current_block_type !== (current_block_type = select_block_type(ctx, dirty))) {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(render_nodes[0].parentNode, render_nodes[0]);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* if_block */
			if_block.d(detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { foo } = $$props;

	$$self.$$set = $$props => {
		if ('foo' in $$props) $$invalidate(0, foo = $$props.foo);
	};

	return [foo];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { foo: 0 });
	}
}

export default Component;