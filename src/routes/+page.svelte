<script>
	import { ProjectCard, Hero } from '$lib/components';
	import { Icon, MagnifyingGlass } from 'svelte-hero-icons';
	import { blur } from 'svelte/transition';

	const isOld = (date) => {
		const currentDate = new Date(); // Current date
		const updatedDate = new Date(date); // Replace with project.updated value
		const differenceInMilliseconds = currentDate - updatedDate;
		const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
		if (daysDifference > 2) {
			return true;
		}
	};

	const isNew = (date) => {
		const currentDate = new Date(); // Current date
		const createDate = new Date(date); // Replace with project.updated value
		const differenceInMilliseconds = currentDate - createDate;
		const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
		if (daysDifference < 1) {
			return true;
		}
	};

	export let data;
	let filter;
</script>

<!-- IF NOT LOGGED IN, SHOW HERO SECTION -->
{#if !data.user}
	<div in:blur>
		<Hero title="Projects" description="Browse all projects shared across all users." />
	</div>

	<!-- IF LOGGED IN, SHOW CONTENT -->
{:else}
	<div>
		<div class="mt-10 text-center text-6xl font-bold tracking-tight text-base-content">
			<div>
				Ne<span class="text-purple-500">x</span>um
			</div>
		</div>
		<p class="text-center mt-1">Projects shared across all users.</p>

		<div class="my-10 flex justify-center px-4">
			<div class="flex items-center justify-center w-full gap-2">
				<Icon src={MagnifyingGlass} class="text-primary w-10 h-10" />
				<!-- svelte-ignore a11y-autofocus -->
				<input
					type="text"
					placeholder="Search Projects, People, Divisions, and Content"
					class="input input-bordered w-full max-w-md"
					bind:value={filter}
					autofocus
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
								.includes(filter.toLowerCase()) || (project.expand.tags && project.expand.tags.some( (tag) => tag.name
											.toLowerCase()
											.includes(filter.toLowerCase()) ))}
							{#if project.user === user.id}
								<ProjectCard
									{project}
									{user}
									tags={data.tags}
									isNew={isNew(project.created)}
									isOld={isOld(project.updated)}
								/>
							{/if}
						{/if}
					{/each}
				{/each}
			</div>
		</div>
	</div>
{/if}
