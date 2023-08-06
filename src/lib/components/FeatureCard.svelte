<script>
	export let title;
	export let description;
</script>

<div class="card rounded-xl w-full bg-neutral text-neutral-content shadow-xl">
	<div class="card-body">
		<div class="flex gap-2 items-center">
			<div class="">
				<slot />
			</div>
			<div class="card-title text-xl">{title}</div>
		</div>
		<div class="font-thin">{description}</div>
	</div>
</div>
