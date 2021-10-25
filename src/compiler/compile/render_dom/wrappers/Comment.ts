import Renderer from '../Renderer';
import Block from '../Block';
import Comment from '../../nodes/Comment';
import Wrapper from './shared/Wrapper';
import { x } from 'code-red';
import { Identifier } from 'estree';

export default class CommentWrapper extends Wrapper {
	node: Comment;
	data: string;
	var: Identifier;

	constructor(
		renderer: Renderer,
		block: Block,
		parent: Wrapper,
		node: Comment,
		_strip_whitespace: boolean,
		_next_sibling: Wrapper
	) {
		super(renderer, block, parent, node);

		this.var = (!this.renderer.options.preserveComments ? null : x`comment`) as unknown as Identifier;
	}

	render(block: Block, parent_node: Identifier, parent_nodes: Identifier) {
		if (!this.renderer.options.preserveComments) return;

		const render_statement = this.get_create_statement(parent_node);

		const claim_statement = this.get_claim_statement(block, parent_node, parent_nodes);

		const mount_statement = this.get_mount_statement();

		const destroy_statement = this.get_destroy_statement();

		block.add_statement(
			this.var,
			this.get_var(),
			render_statement,
			claim_statement,
			mount_statement,
			destroy_statement,
			parent_node as Identifier,
			this
		);
	}
}
