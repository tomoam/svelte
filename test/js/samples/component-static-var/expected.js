/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	attr,
	destroy_block,
	detach,
	init,
	insert,
	listen,
	make_renderer,
	noop,
	replace_text,
	run_all,
	safe_not_equal,
	set_data,
	traverse,
	update_keyed_each
} from "svelte/internal";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[16] = list[i];
	child_ctx[17] = list;
	child_ctx[18] = i;
	return child_ctx;
}

const render_3 = make_renderer(`<section class="main"><input id="toggle-all" class="toggle-all" type="checkbox"> <label for="toggle-all">Mark all as complete</label> <ul class="todo-list"><!></ul> <footer class="footer"><span class="todo-count"><strong> </strong> <!> left</span> <ul class="filters"><li><a href="#/">All</a></li> <li><a href="#/active">Active</a></li> <li><a href="#/completed">Completed</a></li></ul> <!></footer></section>`);
const node_path_3 = () => [0,0,2,3,4,5,0,6,8,0,0,0,11,13,14,10,16,0,0,18,20,0,21,23,0,17,26];

// (83:0) {#if items.length > 0}
function create_if_block(ctx) {
	let render_nodes = [];
	let input_checked_value;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let t6_value = (/*numActive*/ ctx[4] === 1 ? 'item' : 'items') + "";
	let a0_class_value;
	let a1_class_value;
	let a2_class_value;
	let mounted;
	let dispose;
	let each_value = /*filtered*/ ctx[5];
	const get_key = ctx => /*item*/ ctx[16].id;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	let if_block = /*numCompleted*/ ctx[3] && create_if_block_1(ctx);

	return {
		c() {
			traverse(render_3(), render_nodes, node_path_3());

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			render_nodes[11].data = /*numActive*/ ctx[4];
			render_nodes[13] = replace_text(render_nodes[13], t6_value);
			if (if_block) if_block.c();
			render_nodes[1].checked = input_checked_value = /*numCompleted*/ ctx[3] === /*items*/ ctx[1].length;
			attr(render_nodes[18], "class", a0_class_value = /*currentFilter*/ ctx[0] === 'all' ? 'selected' : '');
			attr(render_nodes[21], "class", a1_class_value = /*currentFilter*/ ctx[0] === 'active' ? 'selected' : '');

			attr(render_nodes[24], "class", a2_class_value = /*currentFilter*/ ctx[0] === 'completed'
			? 'selected'
			: '');
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* section */
			each_blocks.forEach(block => block.m(render_nodes[5], render_nodes[6]));
			if (if_block) if_block.m(render_nodes[8], render_nodes[26]);

			if (!mounted) {
				dispose = listen(render_nodes[1], "change", /*toggleAll*/ ctx[8]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*numCompleted, items*/ 10 && input_checked_value !== (input_checked_value = /*numCompleted*/ ctx[3] === /*items*/ ctx[1].length)) {
				render_nodes[1].checked = input_checked_value;
			}

			if (dirty & /*filtered, editing, handleEdit, submit, remove*/ 3236) {
				each_value = /*filtered*/ ctx[5];
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, render_nodes[5], destroy_block, create_each_block, render_nodes[6], get_each_context);
			}

			if (dirty & /*numActive*/ 16) set_data(render_nodes[11], /*numActive*/ ctx[4]);
			if (dirty & /*numActive*/ 16 && t6_value !== (t6_value = (/*numActive*/ ctx[4] === 1 ? 'item' : 'items') + "")) set_data(render_nodes[13], t6_value);

			if (dirty & /*currentFilter*/ 1 && a0_class_value !== (a0_class_value = /*currentFilter*/ ctx[0] === 'all' ? 'selected' : '')) {
				attr(render_nodes[18], "class", a0_class_value);
			}

			if (dirty & /*currentFilter*/ 1 && a1_class_value !== (a1_class_value = /*currentFilter*/ ctx[0] === 'active' ? 'selected' : '')) {
				attr(render_nodes[21], "class", a1_class_value);
			}

			if (dirty & /*currentFilter*/ 1 && a2_class_value !== (a2_class_value = /*currentFilter*/ ctx[0] === 'completed'
			? 'selected'
			: '')) {
				attr(render_nodes[24], "class", a2_class_value);
			}

			if (/*numCompleted*/ ctx[3]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(render_nodes[8], render_nodes[26]);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* section */
			each_blocks.forEach(block => block.d());
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};
}

const render_1 = make_renderer(`<input id="edit" class="edit" autofocus>`);

// (97:5) {#if editing === index}
function create_if_block_2(ctx) {
	let render_nodes = [];
	let input_value_value;
	let mounted;
	let dispose;

	return {
		c() {
			traverse(render_1(), render_nodes);
			render_nodes[0].value = input_value_value = /*item*/ ctx[16].description;
			render_nodes[0].autofocus = true;
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* input */
			render_nodes[0].focus();

			if (!mounted) {
				dispose = [
					listen(render_nodes[0], "keydown", /*handleEdit*/ ctx[10]),
					listen(render_nodes[0], "blur", /*submit*/ ctx[11])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*filtered*/ 32 && input_value_value !== (input_value_value = /*item*/ ctx[16].description) && render_nodes[0].value !== input_value_value) {
				render_nodes[0].value = input_value_value;
			}
		},
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* input */
			mounted = false;
			run_all(dispose);
		}
	};
}

const render_2 = make_renderer(`<li><div class="view"><input class="toggle" type="checkbox"> <label> </label> <button class="destroy"></button></div> <!> </li>`);
const node_path_2 = () => [0,0,0,3,4,0,5,7,2,9,10];

// (89:3) {#each filtered as item, index (item.id)}
function create_each_block(key_1, ctx) {
	let render_nodes = [];
	let t1_value = /*item*/ ctx[16].description + "";
	let li_class_value;
	let mounted;
	let dispose;

	function input_change_handler() {
		/*input_change_handler*/ ctx[12].call(render_nodes[2], /*each_value*/ ctx[17], /*index*/ ctx[18]);
	}

	function dblclick_handler() {
		return /*dblclick_handler*/ ctx[13](/*index*/ ctx[18]);
	}

	function click_handler() {
		return /*click_handler*/ ctx[14](/*index*/ ctx[18]);
	}

	let if_block = /*editing*/ ctx[2] === /*index*/ ctx[18] && create_if_block_2(ctx);

	return {
		key: key_1,
		first: null,
		c() {
			traverse(render_2(), render_nodes, node_path_2());
			render_nodes[5].data = t1_value;
			if (if_block) if_block.c();

			attr(render_nodes[0], "class", li_class_value = "" + ((/*item*/ ctx[16].completed ? 'completed' : '') + " " + (/*editing*/ ctx[2] === /*index*/ ctx[18]
			? 'editing'
			: '')));

			this.first = render_nodes[0];
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* li */
			render_nodes[2].checked = /*item*/ ctx[16].completed;
			if (if_block) if_block.m(render_nodes[0], render_nodes[9]);

			if (!mounted) {
				dispose = [
					listen(render_nodes[2], "change", input_change_handler),
					listen(render_nodes[4], "dblclick", dblclick_handler),
					listen(render_nodes[7], "click", click_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*filtered*/ 32) {
				render_nodes[2].checked = /*item*/ ctx[16].completed;
			}

			if (dirty & /*filtered*/ 32 && t1_value !== (t1_value = /*item*/ ctx[16].description + "")) set_data(render_nodes[5], t1_value);

			if (/*editing*/ ctx[2] === /*index*/ ctx[18]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					if_block.m(render_nodes[0], render_nodes[9]);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*filtered, editing*/ 36 && li_class_value !== (li_class_value = "" + ((/*item*/ ctx[16].completed ? 'completed' : '') + " " + (/*editing*/ ctx[2] === /*index*/ ctx[18]
			? 'editing'
			: '')))) {
				attr(render_nodes[0], "class", li_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* li */
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

const render = make_renderer(`<button class="clear-completed">Clear completed</button>`);

// (122:3) {#if numCompleted}
function create_if_block_1(ctx) {
	let render_nodes = [];
	let mounted;
	let dispose;

	return {
		c() {
			traverse(render(), render_nodes);
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* button */

			if (!mounted) {
				dispose = listen(render_nodes[0], "click", /*clearCompleted*/ ctx[6]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* button */
			mounted = false;
			dispose();
		}
	};
}

const render_4 = make_renderer(`<header class="header"><h1>todos</h1> <input class="new-todo" placeholder="What needs to be done?" autofocus></header> <!>`);
const node_path_4 = () => [0,0,2,3,1,5];

function create_fragment(ctx) {
	let render_nodes = [];
	let mounted;
	let dispose;
	let if_block = /*items*/ ctx[1].length > 0 && create_if_block(ctx);

	return {
		c() {
			traverse(render_4(), render_nodes, node_path_4());
			if (if_block) if_block.c();
			render_nodes[3].autofocus = true;
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* header */
			insert(target, render_nodes[4], anchor); /* t2 */
			insert(target, render_nodes[5], anchor); /* if_block */
			if (if_block) if_block.m(target, render_nodes[5]);
			render_nodes[3].focus();

			if (!mounted) {
				dispose = listen(render_nodes[3], "keydown", /*createNew*/ ctx[9]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*items*/ ctx[1].length > 0) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(render_nodes[5].parentNode, render_nodes[5]);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* header */
			if (detaching) detach(render_nodes[4]); /* t2 */
			if (detaching) detach(render_nodes[5]); /* if_block */
			if (if_block) if_block.d(detaching);
			mounted = false;
			dispose();
		}
	};
}

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

function uuid() {
	return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
		return v.toString(16);
	});
}

function instance($$self, $$props, $$invalidate) {
	let filtered;
	let numActive;
	let numCompleted;
	let currentFilter = 'all';
	let items = [];
	let editing = null;

	try {
		items = JSON.parse(localStorage.getItem('todos-svelte')) || [];
	} catch(err) {
		items = [];
	}

	const updateView = () => {
		$$invalidate(0, currentFilter = 'all');

		if (window.location.hash === '#/active') {
			$$invalidate(0, currentFilter = 'active');
		} else if (window.location.hash === '#/completed') {
			$$invalidate(0, currentFilter = 'completed');
		}
	};

	window.addEventListener('hashchange', updateView);
	updateView();

	function clearCompleted() {
		$$invalidate(1, items = items.filter(item => !item.completed));
	}

	function remove(index) {
		$$invalidate(1, items = items.slice(0, index).concat(items.slice(index + 1)));
	}

	function toggleAll(event) {
		$$invalidate(1, items = items.map(item => ({
			id: item.id,
			description: item.description,
			completed: event.target.checked
		})));
	}

	function createNew(event) {
		if (event.which === ENTER_KEY) {
			$$invalidate(1, items = items.concat({
				id: uuid(),
				description: event.target.value,
				completed: false
			}));

			event.target.value = '';
		}
	}

	function handleEdit(event) {
		if (event.which === ENTER_KEY) event.target.blur(); else if (event.which === ESCAPE_KEY) $$invalidate(2, editing = null);
	}

	function submit(event) {
		$$invalidate(1, items[editing].description = event.target.value, items);
		$$invalidate(2, editing = null);
	}

	function input_change_handler(each_value, index) {
		each_value[index].completed = this.checked;
		(($$invalidate(5, filtered), $$invalidate(0, currentFilter)), $$invalidate(1, items));
	}

	const dblclick_handler = index => $$invalidate(2, editing = index);
	const click_handler = index => remove(index);

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*currentFilter, items*/ 3) {
			$: $$invalidate(5, filtered = currentFilter === 'all'
			? items
			: currentFilter === 'completed'
				? items.filter(item => item.completed)
				: items.filter(item => !item.completed));
		}

		if ($$self.$$.dirty & /*items*/ 2) {
			$: $$invalidate(4, numActive = items.filter(item => !item.completed).length);
		}

		if ($$self.$$.dirty & /*items*/ 2) {
			$: $$invalidate(3, numCompleted = items.filter(item => item.completed).length);
		}

		if ($$self.$$.dirty & /*items*/ 2) {
			$: try {
				localStorage.setItem('todos-svelte', JSON.stringify(items));
			} catch(err) {
				
			} // noop
		}
	};

	return [
		currentFilter,
		items,
		editing,
		numCompleted,
		numActive,
		filtered,
		clearCompleted,
		remove,
		toggleAll,
		createNew,
		handleEdit,
		submit,
		input_change_handler,
		dblclick_handler,
		click_handler
	];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;