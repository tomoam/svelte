import DebugTag from '../../nodes/DebugTag';
import Renderer, { RenderOptions } from '../Renderer';
import { x, p } from 'code-red';
import { Identifier } from 'estree';
import { is_static_only } from './utils/is_static_only';

export default function(node: DebugTag, renderer: Renderer, options: RenderOptions) {
	if (is_static_only(options)) return;

	if (!options.dev) return;

	const filename = options.filename || null;
	const { line, column } = options.locate(node.start + 1);

	const obj = x`{
		${node.expressions.map(e => p`${(e.node as Identifier).name}`)}
	}`;

	renderer.add_expression(x`@debug(${filename ? x`"${filename}"` : x`null`}, ${line - 1}, ${column}, ${obj})`);
}
