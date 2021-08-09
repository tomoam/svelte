<script>
	let checked = false;
	let childChecked = false;
	let str = 'Child';
</script>

<div>
	<input type='text' bind:value={str}>
	<input type='checkbox' bind:checked>
	{#if checked}
		<span>Visible!</span>
		<input type='checkbox' bind:checked={childChecked}>
		{#if childChecked}
			<span>{str} Visible!</span>
		{/if}
	{:else}
		<article>abc</article>
	{/if}
</div>