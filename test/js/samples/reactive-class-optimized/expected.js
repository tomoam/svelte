/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	component_subscribe,
	detach,
	init,
	insert_experimental,
	make_renderer,
	noop,
	safe_not_equal,
	subscribe,
	toggle_class
} from "svelte/internal";

import { reactiveStoreVal, unreactiveExport } from './store';
const render = make_renderer(`<div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div>`);

function create_fragment(ctx) {
	let div0;
	let t0;
	let div1;
	let t1;
	let div2;
	let t2;
	let div3;
	let t3;
	let div4;
	let t4;
	let div5;
	let t5;
	let div6;
	let t6;
	let div7;
	let t7;
	let div8;

	return {
		c() {
			div0 = render().firstChild;
			t0 = div0.nextSibling;
			div1 = t0.nextSibling;
			t1 = div1.nextSibling;
			div2 = t1.nextSibling;
			t2 = div2.nextSibling;
			div3 = t2.nextSibling;
			t3 = div3.nextSibling;
			div4 = t3.nextSibling;
			t4 = div4.nextSibling;
			div5 = t4.nextSibling;
			t5 = div5.nextSibling;
			div6 = t5.nextSibling;
			t6 = div6.nextSibling;
			div7 = t6.nextSibling;
			t7 = div7.nextSibling;
			div8 = t7.nextSibling;
			toggle_class(div0, "update1", reactiveModuleVar);
			toggle_class(div1, "update2", /*reactiveConst*/ ctx[0].x);
			toggle_class(div2, "update3", nonReactiveGlobal && /*reactiveConst*/ ctx[0].x);
			toggle_class(div3, "update4", /*$reactiveStoreVal*/ ctx[2]);
			toggle_class(div4, "update5", /*$reactiveDeclaration*/ ctx[3]);
			toggle_class(div5, "static1", nonReactiveModuleVar);
			toggle_class(div6, "static2", nonReactiveGlobal);
			toggle_class(div7, "static3", nonReactiveModuleVar && nonReactiveGlobal);
			toggle_class(div8, "static4", unreactiveExport);
		},
		m(target, anchor) {
			insert_experimental(target, div0, anchor);
			insert_experimental(target, t0, anchor);
			insert_experimental(target, div1, anchor);
			insert_experimental(target, t1, anchor);
			insert_experimental(target, div2, anchor);
			insert_experimental(target, t2, anchor);
			insert_experimental(target, div3, anchor);
			insert_experimental(target, t3, anchor);
			insert_experimental(target, div4, anchor);
			insert_experimental(target, t4, anchor);
			insert_experimental(target, div5, anchor);
			insert_experimental(target, t5, anchor);
			insert_experimental(target, div6, anchor);
			insert_experimental(target, t6, anchor);
			insert_experimental(target, div7, anchor);
			insert_experimental(target, t7, anchor);
			insert_experimental(target, div8, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*reactiveModuleVar*/ 0) {
				toggle_class(div0, "update1", reactiveModuleVar);
			}

			if (dirty & /*reactiveConst*/ 1) {
				toggle_class(div1, "update2", /*reactiveConst*/ ctx[0].x);
			}

			if (dirty & /*nonReactiveGlobal, reactiveConst*/ 1) {
				toggle_class(div2, "update3", nonReactiveGlobal && /*reactiveConst*/ ctx[0].x);
			}

			if (dirty & /*$reactiveStoreVal*/ 4) {
				toggle_class(div3, "update4", /*$reactiveStoreVal*/ ctx[2]);
			}

			if (dirty & /*$reactiveDeclaration*/ 8) {
				toggle_class(div4, "update5", /*$reactiveDeclaration*/ ctx[3]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t0);
			if (detaching) detach(div1);
			if (detaching) detach(t1);
			if (detaching) detach(div2);
			if (detaching) detach(t2);
			if (detaching) detach(div3);
			if (detaching) detach(t3);
			if (detaching) detach(div4);
			if (detaching) detach(t4);
			if (detaching) detach(div5);
			if (detaching) detach(t5);
			if (detaching) detach(div6);
			if (detaching) detach(t6);
			if (detaching) detach(div7);
			if (detaching) detach(t7);
			if (detaching) detach(div8);
		}
	};
}

let nonReactiveModuleVar = Math.random();
let reactiveModuleVar = Math.random();

function instance($$self, $$props, $$invalidate) {
	let reactiveDeclaration;
	let $reactiveStoreVal;

	let $reactiveDeclaration,
		$$unsubscribe_reactiveDeclaration = noop,
		$$subscribe_reactiveDeclaration = () => ($$unsubscribe_reactiveDeclaration(), $$unsubscribe_reactiveDeclaration = subscribe(reactiveDeclaration, $$value => $$invalidate(3, $reactiveDeclaration = $$value)), reactiveDeclaration);

	component_subscribe($$self, reactiveStoreVal, $$value => $$invalidate(2, $reactiveStoreVal = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_reactiveDeclaration());
	nonReactiveGlobal = Math.random();
	const reactiveConst = { x: Math.random() };
	reactiveModuleVar += 1;

	if (Math.random()) {
		reactiveConst.x += 1;
	}

	$: $$subscribe_reactiveDeclaration($$invalidate(1, reactiveDeclaration = reactiveModuleVar * 2));
	return [reactiveConst, reactiveDeclaration, $reactiveStoreVal, $reactiveDeclaration];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;