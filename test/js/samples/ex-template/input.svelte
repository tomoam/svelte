<script>
	let name = "world";
	let description = "see below";
</script>

<section>
	<div class="test">
		<input bind:value={name} />
		<h1>Hello {name}!</h1>
		<p>{description}</p>
	</div>
</section>
