<script>
	import { msgStore, feedSelect } from './../lib/store.js';
	import { PageCard, Hero } from '$lib/components';
	import { Icon, MagnifyingGlass, XMark, Rss } from 'svelte-hero-icons';
	import { blur } from 'svelte/transition';

	export let data;
	let filter;

	const handleFeedSelect = () => {
		$feedSelect = !$feedSelect;
	};

	const isOld = (date) => {
		const currentDate = new Date(); // Current date
		const updatedDate = new Date(date); // Replace with page.updated value
		const differenceInMilliseconds = currentDate - updatedDate;
		const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
		if (daysDifference > 30) {
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
		<div class="mt-10 text-center text-7xl font-bold tracking-tight text-base-content">
			<div>
				Ne<span class="text-purple-500">x</span>um
			</div>
		</div>
		<div class="text-center mt-1">Pages shared across all users.</div>

		<div class="my-10 flex justify-center px-4">
			<div class="flex items-center justify-center w-full gap-2">
				<div class=" flex w-full max-w-lg border border-primary rounded p-3">
					<div class="flex items-center gap-2 w-full">
						<Icon src={MagnifyingGlass} class=" text-primary w-5 h-5" />
						<!-- svelte-ignore a11y-autofocus -->
						<input
							type="text"
							placeholder="Search Pages, People, Divisions, and Content"
							class="w-full focus:outline-none bg-base-100"
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
			<div class="flex items-center mx-4">
				<div class="">
					<label class="group cursor-pointer">
						<div
							class=" flex items-center gap-3 border border-primary/50 group-hover:border-primary/50 py-2.5 px-4 rounded group-hover:shadow-md transition-all duration-200"
						>
							<div class="flex gap-1 items-center uppercase">
								<Icon src={Rss} class="w-5 h-5" />
								<!-- <div class="">My</div> -->
								<div class="">Feed</div>
							</div>
							<input
								type="checkbox"
								bind:checked={$feedSelect}
								class="checkbox border group-hover:border-primary transition-all duration-500"
								on:click={handleFeedSelect}
							/>
						</div>
					</label>
				</div>

				<div class="ml-5 border-r h-16 border-primary/50" />
				<div
					class="flex overflow-x-auto md:overflow-x-auto no-scrollbar md:justify-cener items-center gap-2 px-4"
				>
					<!-- <label class="swap">
					<input on:click={handleFeedSelect} type="checkbox" />
					<div class="swap-on btn btn-success rounded w-full">All Pages</div>
					<div class="swap-off btn btn-info rounded w-full">Following</div>
				</label> -->

					{#each data.tags as tag}
						<button
							class="border border-primary/25 py-1 px-2 uppercase my-2 hover:shadow transition-all duration-100 rounded"
							on:click={() => handleFilter(tag.name)}>{tag.name}</button
						>
					{/each}
				</div>

				<div class="border-l h-16 border-primary/50" />
			</div>
		{/if}

		{#if $feedSelect}
			<!-- <div class="text-5xl font-bold px-4">My Feed:</div> -->

			<div class="flex justify-center pt-4">
				<div class="flex flex-col w-full px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{#each data.pages as page}
						{#each data.users as user}
							{#if data.user.following.includes(page.user)}
								{#if !filter || page.name
										.toLowerCase()
										.includes(filter.toLowerCase()) || page.tagline
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
										<PageCard
											{page}
											{user}
											isNew={isNew(page.created)}
											isOld={isOld(page.updated)}
										/>
									{/if}
								{/if}
							{/if}
						{/each}
					{/each}
				</div>
			</div>
		{:else}
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
									<PageCard {page} {user} isNew={isNew(page.created)} isOld={isOld(page.updated)} />
								{/if}
							{/if}
						{/each}
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/if}
