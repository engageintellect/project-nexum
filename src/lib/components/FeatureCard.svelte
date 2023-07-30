<script>
	export let title;
	export let description;
	// export let button;
	// export let image;
</script>

<div class="card w-full bg-primary text-neutral-content shadow-xl min-h-72 h-full">
	<!-- <figure> -->
	<!-- <img src={image} alt="Shoes" /> -->
	<!-- </figure> -->
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>{description}</p>
		<!-- <div class="card-actions justify-center">
			<button class="btn btn-primary">{button}</button>
		</div> -->
	</div>
</div>
