<script>
	import { ProjectCard, Hero } from '$lib/components';
	import { Icon, MagnifyingGlass } from 'svelte-hero-icons';
	export let data;

	let filter;
</script>

<!-- <Hero title="Projects" description="Browse all projects shared across all users." /> -->

<div class="">
	<div class="mt-2 text-center text-6xl font-bold tracking-tight text-base-content">
		<div>
			Ne<span class="text-purple-500">x</span>um
		</div>
	</div>
	<p class="text-center mt-1">Projects shared across all users.</p>

	<div class="my-10 flex justify-center px-4">
		<div class="flex items-center justify-center w-full gap-2">
			<Icon src={MagnifyingGlass} class="text-primary w-10 h-10" />
			<input
				type="text"
				placeholder="Search Projects, Divisions, and Content"
				class="input input-bordered w-full max-w-md"
				bind:value={filter}
			/>
		</div>
	</div>

	<div class="flex justify-center pt-4">
		<div class="flex flex-col w-full px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
			<!-- TODO: I'm sure this could be cleaner, but I'm not sure how to do it. -->
			{#each data.projects as project}
				{#each data.users as user}
					{#if !filter || project.name
							.toLowerCase()
							.includes(filter.toLowerCase()) || project.tagline
							.toLowerCase()
							.includes(filter.toLowerCase()) || project.division
							.toLowerCase()
							.includes(filter.toLowerCase()) || project.description
							.toLowerCase()
							.includes(filter.toLowerCase()) || user.name
							.toLowerCase()
							.includes(filter.toLowerCase())}
						{#if project.user === user.id}
							<ProjectCard {project} {user} />
						{/if}
					{/if}
				{/each}
			{/each}
		</div>
	</div>
</div>
