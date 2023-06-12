<script>
	import { getImageURL } from '$lib/utils';
	import readtime from 'read-time';
	export let data;

	const readTime = readtime(data.project.description);
</script>

<div class="flex flex-col w-full mt-4 max-w-3xl mx-auto px-4">
	<!-- TITLE -->
	<div>
		<h1 class="text-6xl font-bold mt-4">
			{data.project.name}
		</h1>
		<p class="text-2xl font-light mt-2">{data.project.tagline}</p>
	</div>
	<div>
		<p class="mt-1">
			<a class="text-primary hover:underline" target="_blank" href={data.project.url}
				>{data.project.url}</a
			>
		</p>
	</div>
	<!-- CREATOR -->
	{#each data.users as creator}
		{#if creator.id === data.project.user}
			<div class="flex gap-2 my-10">
				<div class="flex gap-5 items-center">
					<div>
						<img
							class="w-16 h-16 rounded-full border border-primary"
							src={creator?.avatar
								? getImageURL(creator?.collectionId, creator?.id, creator?.avatar)
								: `https://ui-avatars.com/api/?name=${creator?.name}`}
							alt="User avatar"
						/>
					</div>

					<div class="flex flex-col justify-center">
						<p class="text-lg font-semibold primary-content">{creator.name}</p>
						<p class="text-sm font-medium secondary-content">{creator.job_title}</p>
						<p class="text-md font-bold primary-content">{readTime.text} read.</p>
					</div>
				</div>
			</div>
		{/if}
	{/each}

	<!-- TAGS -->
	{#if data.project.expand.tags}
		<div class="flex gap-2 my-5">
			{#each data.project.expand.tags as tag}
				<div class="badge badge-outline badge-primary">{tag.name}</div>
			{/each}
		</div>
	{/if}

	<!-- IMAGE -->
	<div class="avatar">
		<div class="w-full h-64 rounded shadow-md">
			<img
				src={data.project?.thumbnail
					? getImageURL(data.project.collectionId, data.project.id, data.project.thumbnail, '0x0')
					: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${data.project.name}`}
				alt="project thumbnail"
			/>
		</div>
	</div>

	<!-- CONTENT -->
	<div class="mt-10 page-content">
		{@html data.project.description}
	</div>
</div>
