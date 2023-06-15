<script>
	import { Stats } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import { Icon, PencilSquare } from 'svelte-hero-icons';
	export let data;

	let count = {
		likes: data.user.likes.length,
		favorites: data.user.favorites.length
	};

	const projectCount = data.projects.reduce((count, project) => {
		if (project.user === data.user.id) {
			return count + 1;
		}
		return count;
	}, 0);
</script>

<div class="mt-10 px-4">
	<div class="text-6xl font-bold">
		{data.user.username}'s Dashboard.'
	</div>
	<div class="divider" />

	<Stats
		projects={projectCount}
		likes={count.likes}
		favorites={count.favorites}
		avatar={data.user?.avatar
			? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
			: `https://ui-avatars.com/api/?name=${data.user?.name}`}
	/>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
		<div class="">
			<div class="text-3xl md:hidden">Projects</div>
			<div class=" flex flex-col">
				{#each data.projects as project}
					{#if project.user === data.user.id}
						<a
							class="p-5 border border-primary hover:shadow-lg rounded my-2 transition-all duration-200"
							href={`/projects/${project.id}`}
						>
							<div class="flex justify-between">
								<div>
									{project.name}
								</div>

								<div class="hover:scale-105 active:scale-95 transition-transform duration-200">
									<a href={`/projects/${project.id}/edit`}>
										<Icon src={PencilSquare} class="w-5 h-5 text-primary" solid />
									</a>
								</div>
							</div>
						</a>
					{/if}
				{/each}
			</div>
		</div>

		<div class="">
			<div class="text-3xl md:hidden">Favorites</div>
			<div class=" flex flex-col">
				{#each data.user.favorites as favorite}
					{#each data.projects as project}
						{#if project.id === favorite}
							<a
								class="p-5 border border-primary hover:shadow-lg rounded my-2 transition-all duration-200"
								href={`/projects/${project.id}`}
							>
								{project.name}
							</a>
						{/if}
					{/each}
				{/each}
			</div>
		</div>

		<div class="">
			<div class="text-3xl md:hidden">Likes</div>
			<div class=" flex flex-col">
				{#each data.user.likes as like}
					{#each data.projects as project}
						{#if project.id === like}
							<a
								class="p-5 border border-primary hover:shadow-lg rounded my-2 transition-all duration-200"
								href={`/projects/${project.id}`}
							>
								{project.name}
							</a>
						{/if}
					{/each}
				{/each}
			</div>
		</div>
	</div>
</div>
