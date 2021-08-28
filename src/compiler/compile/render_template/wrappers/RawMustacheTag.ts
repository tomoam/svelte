import { b, x } from 'code-red';
import Renderer from '../Renderer';
import Block from '../Block';
import Tag from './shared/Tag';
import Wrapper from './shared/Wrapper';
import MustacheTag from '../../nodes/MustacheTag';
import RawMustacheTag from '../../nodes/RawMustacheTag';
import { is_head } from './shared/is_head';
import { Identifier } from 'estree';

export default class RawMustacheTagWrapper extends Tag {
	var: Identifier = { type: 'Identifier', name: 'raw' };

	constructor(
		renderer: Renderer,
		block: Block,
		parent: Wrapper,
		node: MustacheTag | RawMustacheTag
	) {
		super(renderer, block, parent, node);
		this.cannot_use_innerhtml();
		this.not_static_content();
	}

	render(block: Block, parent_node: Identifier, parent_nodes: Identifier) {
		const in_head = is_head(parent_node);

		const can_use_innerhtml = !in_head && parent_node && !this.prev && !this.next;

		if (can_use_innerhtml) {
			const insert = content => b`${parent_node}.innerHTML = ${content};`[0];

			const { init } = this.rename_this_method(
				block,
				content => insert(content)
			);

			block.chunks.mount.push(insert(init));
		} else {
			const html_tag = block.get_unique_name('html_tag');

			block.add_variable(html_tag);

			const { init } = this.rename_this_method(
				block,
				content => x`${html_tag}.p(${content})`
			);

			block.chunks.create.push(b`${html_tag} = new @HtmlTag();`);

			if (this.renderer.options.hydratable) {
				block.chunks.claim.push(b`${html_tag} = @claim_html_tag(${parent_nodes});`);
			}

			const insert_anchor = this.get_initial_anchor_node(parent_node);
			block.chunks.mount.push(b`${html_tag}.m(${init}, ${parent_node || '#target'}, ${insert_anchor});`);

			const update_anchor = this.get_or_create_anchor(block, parent_node, parent_nodes, 'html_anchor');
			block.chunks.hydrate.push(b`${html_tag}.a = ${update_anchor};`);

			if (!parent_node || in_head) {
				block.chunks.destroy.push(b`if (detaching) ${html_tag}.d();`);
			}
		}
	}
}