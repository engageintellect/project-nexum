<script>
	import { getImageURL } from '$lib/utils';
	export let data;
</script>

<div class="flex flex-col w-full mt-4 max-w-3xl mx-auto px-4">
	<div class="avatar">
		<div class="w-40 rounded">
			<img
				src={data.project?.thumbnail
					? getImageURL(data.project.collectionId, data.project.id, data.project.thumbnail, '0x0')
					: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${data.project.name}`}
				alt="project thumbnail"
			/>
		</div>
	</div>

	<h1 class="text-3xl font-bold mt-4">
		{data.project.name}
	</h1>
	<p class="text-2xl font-light mt-2">{data.project.tagline}</p>
	<p class="mt-1">
		<a class="text-primary hover:underline" target="_blank" href={data.project.url}
			>{data.project.url}</a
		>
	</p>
	<p class="mt-5">{data.project.description}</p>
</div>
