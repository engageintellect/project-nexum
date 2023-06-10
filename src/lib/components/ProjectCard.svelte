<script>
	import { getImageURL } from '$lib/utils';
	export let project;
	export let user;
</script>

<div
	class="card border bg-base-100 rounded group hover:saturate-150 shadow-md hover:shadow-lg transition-all duration-300"
>
	<a href="/projects/{project.id}" class="rounded">
		<div class="flex gap-2 items-center p-4">
			<img
				class="w-8 h-8 rounded-full border border-primary"
				src={user?.avatar
					? getImageURL(user?.collectionId, user?.id, user?.avatar)
					: `https://ui-avatars.com/api/?name=${user?.name}`}
				alt="User avatar"
			/>
			<div class="flex flex-col">
				<p class="text-md font-medium primary-content">{user.name}</p>
				<p class="text-xs font-thin secondary-content">{user.job_title}</p>
			</div>
		</div>
		<div class="relative overflow-hidden">
			<img
				class="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
				src={project?.thumbnail
					? getImageURL(project.collectionId, project.id, project.thumbnail)
					: `https://via.placeholder.com/500/4506CB/FFFFFF/?text=${project.name}`}
				alt="project thumbnail"
			/>
		</div>
		<div class="card-body p-4">
			{#if project.division}
				<div class="badge badge-primary rounded py-3 gap-2">
					{project.division}
				</div>
			{/if}

			<div>
				<h2 class="card-title">{project.name}</h2>

				<p>{project.tagline}</p>
			</div>

			{#if project.expand.tags}
				<div class="flex items-end gap-2 mt-2">
					{#each project.expand.tags as tag}
						<div class="badge badge-outline rounded">{tag.name}</div>
					{/each}
				</div>
			{/if}
		</div>
	</a>
</div>
