<script>
	import { Stats } from '$lib/components';
	export let data;

	let count = {
		likes: data.user.likes.length,
		favorites: data.user.favorites.length
	};
</script>

<div class="mt-10 px-4">
	<div class="text-6xl font-bold">
		{data.user.username}'s Dashboard.'
	</div>
	<div class="divider" />

	<Stats likes={count.likes} favorites={count.favorites} avatar={data.user.avatar} />

	<div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
		<div class="">
			<div class="text-3xl font-bold">Projects</div>
			<div class=" flex flex-col">
				{#each data.projects as project}
					{#if project.user === data.user.id}
						<a class="p-5 bg-base-300 rounded my-2" href={`/projects/${project.id}`}>
							{project.name}
						</a>
					{/if}
				{/each}
			</div>
		</div>

		<div class="">
			<div class="text-3xl font-bold">Likes</div>
			<div class=" flex flex-col">
				{#each data.user.likes as like}
					{#each data.projects as project}
						{#if project.id === like}
							<a class="p-5 bg-base-300 rounded my-2" href={`/projects/${project.id}`}>
								{project.name}
							</a>
						{/if}
					{/each}
				{/each}
			</div>
		</div>

		<div class="">
			<div class="text-3xl font-bold">Favorites</div>
			<div class=" flex flex-col">
				{#each data.user.favorites as favorite}
					{#each data.projects as project}
						{#if project.id === favorite}
							<a class="p-5 bg-base-300 rounded my-2" href={`/projects/${project.id}`}>
								{project.name}
							</a>
						{/if}
					{/each}
				{/each}
			</div>
		</div>
	</div>
</div>
