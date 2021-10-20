import { TemplateNode } from '../../interfaces';
import { INode } from '../nodes/interfaces';

export default function is_dom_node(node: TemplateNode | INode) {
	return (
		node.type === 'Element' ||
		node.type === 'Text' ||
		node.type === 'MustacheTag'
	);
}
