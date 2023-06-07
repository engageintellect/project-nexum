<script>
	import { getImageURL } from '$lib/utils';
	export let project;
</script>

<div
	class="card bg-base-100 shadow-lg rounded-lg group hover:saturate-150 hover:shadow-xl transition-all duration-200"
>
	<a href="/projects/{project.id}" class="rounded-lg">
		<figure>
			<img
				class="rounded-t-lg h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
				src={project?.thumbnail
					? getImageURL(project.collectionId, project.id, project.thumbnail)
					: `https://via.placeholder.com/500/4506CB/FFFFFF/?text=${project.name}`}
				alt="project thumbnail"
			/>
		</figure>
		<div class="card-body">
			<h2 class="card-title">{project.name}</h2>
			<!-- <div class="badge badge-secondary">{project.division}</div> -->

			{#if project.division}
				<div class="badge badge-info w-1/3 rounded-full py-3 gap-2">
					{project.division}
				</div>
			{/if}

			<p>{project.tagline}</p>
			<div class="card-actions mt-5">
				<a href="/projects/{project.id}" class="btn btn-outline w-full">View Project</a>
			</div>
		</div>
	</a>
</div>
