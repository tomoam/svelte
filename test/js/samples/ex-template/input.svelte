<script>
	let name = "world";
	let description = "see below";
</script>

<section>
  <div>
	<input bind:value={name}>
    <h1>Hello {name}!</h1>
    <p>{description}</p>
  </div>
</section>
