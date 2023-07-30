<script>
	export let title;
	export let description;
	// export let button;
	// export let image;
</script>

<div class="card rounded-xl w-full bg-primary text-neutral-content shadow-xl">
	<!-- <figure> -->
	<!-- <img src={image} alt="Shoes" /> -->
	<!-- </figure> -->
	<div class="card-body">
		<div class="flex gap-2 items-center">
			<div class="">
				<slot />
			</div>
			<div class="card-title text-xl">{title}</div>
		</div>
		<div class="font-thin">{description}</div>

		<!-- <div class="card-actions justify-center">
			<button class="btn btn-primary">{button}</button>
		</div> -->
	</div>
</div>
