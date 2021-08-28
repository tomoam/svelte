import { x } from "code-red";
import { is_head } from "./is_head";
import Wrapper from "./Wrapper";
import { Identifier } from 'estree';
import { needs_svg_wrapper } from './needs_svg_wrapper';

export function get_node_path(node: Wrapper, parent_node: Identifier) {
	if (node.template_name) {
		const node_path = needs_svg_wrapper(node) ? x`${node.template_name}().firstChild` : `${node.template_name}()`;
		return x`${node_path}.firstChild`;
	} else if (is_head(parent_node) && node.parent.template_name && (!node.prev || !node.prev.var)) {
		return  x`${node.parent.template_name}().firstChild`;
	} else if (node.prev) {
		const prev_var = node.prev.is_dom_node() ? node.prev.var : node.prev.anchor;
		return x`${prev_var}.nextSibling`;
	} else {
		return x`${parent_node}.firstChild`;
	}
}