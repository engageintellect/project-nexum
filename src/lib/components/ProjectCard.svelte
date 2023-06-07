<script>
	import { getImageURL } from '$lib/utils';
	export let project;
</script>

<div
	class="card border bg-base-100 rounded group hover:saturate-150 hover:shadow-lg transition-all duration-300"
>
	<a href="/projects/{project.id}" class="rounded">
		<figure>
			<img
				class="rounded-t h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
				src={project?.thumbnail
					? getImageURL(project.collectionId, project.id, project.thumbnail)
					: `https://via.placeholder.com/500/4506CB/FFFFFF/?text=${project.name}`}
				alt="project thumbnail"
			/>
		</figure>
		<div class="card-body p-4">
			{#if project.division}
				<div class="badge badge-primary rounded py-3 gap-2">
					{project.division}
				</div>
			{/if}

			<h2 class="card-title">{project.name}</h2>
			<!-- <div class="badge badge-secondary">{project.division}</div> -->

			<p>{project.tagline}</p>

			<!-- <div class="card-actions mt-5">
				<a href="/projects/{project.id}" class="btn btn-outline w-full">View Project</a>
			</div> -->
		</div>
	</a>
</div>
