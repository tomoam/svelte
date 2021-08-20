import { x } from "code-red";
import { is_head } from "./is_head";
import Wrapper from "./Wrapper";
import { Identifier } from 'estree';

export function get_node_path(node: Wrapper, parent_node: Identifier) {
	if (node.template_index) {
		return x`@first_child(${node.template_index}())`;
	} else if (is_head(parent_node) && node.parent.template_index && (!node.prev || !node.prev.var)) {
		return  x`@first_child(${node.parent.template_index}())`;
	} else if (node.prev) {
		const prev_var = node.prev.is_dom_node() ? node.prev.var : node.prev.anchor;
		return x`@next_sibling(${prev_var})`;
	} else {
		return x`@first_child(${parent_node})`;
	}
}
