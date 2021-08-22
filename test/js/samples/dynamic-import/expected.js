/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	create_component,
	destroy_component,
	detach,
	first_child,
	init,
	insert_experimental,
	make_renderer,
	mount_component,
	noop,
	replace_blank,
	safe_not_equal,
	transition_in,
	transition_out
} from "svelte/internal";

import LazyLoad from './LazyLoad.svelte';
const render = make_renderer(`<!>`);

function create_fragment(ctx) {
	let lazyload;
	let lazyload_anchor;
	let current;
	lazyload = new LazyLoad({ props: { load: func } });

	return {
		c() {
			create_component(lazyload.$$.fragment);
			lazyload_anchor = replace_blank(first_child(render()));
		},
		m(target, anchor) {
			mount_component(lazyload, target, anchor);
			insert_experimental(target, lazyload_anchor, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(lazyload.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(lazyload.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(lazyload_anchor);
			destroy_component(lazyload, detaching);
		}
	};
}

const func = () => import('./Foo.svelte');

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {});
	}
}

export default Component;