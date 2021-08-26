import Node from '../../nodes/shared/Node';

export function is_text(node: Node) {
	return node && (node.type === 'MustacheTag' || node.type === 'Text');
}