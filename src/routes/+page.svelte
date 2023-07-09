<script>
	import { PageCard, Hero } from '$lib/components';
	import { Icon, MagnifyingGlass, XMark } from 'svelte-hero-icons';
	import { blur } from 'svelte/transition';

	export let data;
	let filter;

	const isOld = (date) => {
		const currentDate = new Date(); // Current date
		const updatedDate = new Date(date); // Replace with page.updated value
		const differenceInMilliseconds = currentDate - updatedDate;
		const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
		if (daysDifference > 15) {
			return true;
		}
	};

	const isNew = (date) => {
		const currentDate = new Date(); // Current date
		const createDate = new Date(date); // Replace with page.updated value
		const differenceInMilliseconds = currentDate - createDate;
		const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
		if (daysDifference < 1) {
			return true;
		}
	};

	const handleFilter = (value) => {
		filter = value;
	};
</script>

<!-- IF NOT LOGGED IN, SHOW HERO SECTION -->
{#if !data.user}
	<div in:blur>
		<Hero title="Pages" content="Browse all pages shared across all users." />
	</div>

	<!-- IF LOGGED IN, SHOW CONTENT -->
{:else}
	<div>
		<div class="mt-10 text-center text-6xl font-bold tracking-tight text-base-content">
			<div>
				Ne<span class="text-purple-500">x</span>um
			</div>
		</div>
		<p class="text-center mt-1">Pages shared across all users.</p>

		<div class="my-10 flex justify-center px-4">
			<div class="flex items-center justify-center w-full gap-2">
				<div class=" flex w-full max-w-md border border-primary rounded p-3">
					<div class="flex items-center gap-2 w-full">
						<Icon src={MagnifyingGlass} class=" text-primary w-5 h-5" />
						<!-- svelte-ignore a11y-autofocus -->
						<input
							type="text"
							placeholder="Search Pages, People, Divisions, and Content"
							class="w-full focus:outline-none"
							bind:value={filter}
							autofocus
						/>
					</div>

					{#if filter}
						<button class="focus:outline-none md:hover:scale-110" on:click={() => (filter = '')}>
							<Icon src={XMark} class="w-5 h-5" />
						</button>
					{/if}
				</div>
			</div>
		</div>

		{#if data.tags}
			<div class="flex overflow-x-auto no-scrollbar md:justify-center items-center gap-2 my-5 px-4">
				{#each data.tags as tag}
					<button class="btn btn-outline" on:click={() => handleFilter(tag.name)}>{tag.name}</button
					>
				{/each}
			</div>
		{/if}

		<div class="flex justify-center pt-4">
			<div class="flex flex-col w-full px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
				<!-- TODO: I'm sure this could be cleaner, but I'm not sure how to do it. -->

				{#each data.pages as page}
					{#each data.users as user}
						{#if !filter || page.name.toLowerCase().includes(filter.toLowerCase()) || page.tagline
								.toLowerCase()
								.includes(filter.toLowerCase()) || (Array.isArray(page.division) && page.division.some( (division) => division
											.toLowerCase()
											.includes(filter.toLowerCase()) )) || page.content
								.toLowerCase()
								.includes(filter.toLowerCase()) || user.name
								.toLowerCase()
								.includes(filter.toLowerCase()) || (page.expand.tags && page.expand.tags.some( (tag) => tag.name
											.toLowerCase()
											.includes(filter.toLowerCase()) ))}
							{#if page.user === user.id}
								<div class="focus:outline outline-red-500">
									<PageCard {page} {user} isNew={isNew(page.created)} isOld={isOld(page.updated)} />
								</div>
							{/if}
						{/if}
					{/each}
				{/each}
			</div>
		</div>
	</div>
{/if}
