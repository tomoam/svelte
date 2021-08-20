import Wrapper from "./Wrapper";
import { Identifier } from 'estree';
import { is_head } from "./is_head";

export function get_initial_anchor_node(node: Wrapper, parent_node: Identifier): Identifier {
	return !parent_node ? { type: 'Identifier', name: '#anchor' } : !is_head(parent_node) && node.next && node.next.is_dom_node() ? node.next.var : { type: 'Identifier', name: 'null' }; 
}