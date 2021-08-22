/* generated by Svelte vX.Y.Z */
import {
	SvelteElement,
	attribute_to_object,
	detach,
	first_child,
	init,
	insert_experimental,
	make_renderer,
	noop,
	safe_not_equal
} from "svelte/internal";

const render = make_renderer(`<div>fades in</div>`);

function create_fragment(ctx) {
	let div;

	return {
		c() {
			div = first_child(render());
			this.c = noop;
		},
		m(target, anchor) {
			insert_experimental(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

class Component extends SvelteElement {
	constructor(options) {
		super();
		this.shadowRoot.innerHTML = `<style>div{animation:foo 1s}@keyframes foo{0%{opacity:0}100%{opacity:1}}</style>`;

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes),
				customElement: true
			},
			null,
			create_fragment,
			safe_not_equal,
			{},
			null
		);

		if (options) {
			if (options.target) {
				insert_experimental(options.target, this, options.anchor);
			}
		}
	}
}

customElements.define("custom-element", Component);
export default Component;