<script>
	import { msgStore, feedSelect } from './../lib/store.js';
	import { PageCard, Hero } from '$lib/components';
	import { Icon, MagnifyingGlass, XMark, Rss, GlobeAmericas, UserGroup } from 'svelte-hero-icons';
	import { blur } from 'svelte/transition';
	import MyPageItem from '../lib/components/MyPageItem.svelte';

	export let data;
	let filter;

	// const getDivisions = () => {
	// 	const divisions = new Set();

	// 	for (let i = 0; i < data.pages.length; i++) {
	// 		const pageDivisions = data.pages[i].division;

	// 		for (let j = 0; j < pageDivisions.length; j++) {
	// 			divisions.add(pageDivisions[j]);
	// 		}
	// 	}

	// 	return Array.from(divisions);
	// };

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

<div>
	<div class="mt-10 text-center text-7xl font-bold tracking-tight text-base-content">
		<div>
			Ne<span class="text-purple-500">x</span>um
		</div>
	</div>
	<div class="text-center my-5">
		{#if $feedSelect}
			<div class="flex justify-center items-center gap-2">
				<div class="">
					<strong>Displaying </strong>users you are
					<span class="text-purple-500 font-bold">following</span>
				</div>
				<div><Icon src={UserGroup} class="w-7 h-7 text-purple-500" solid /></div>
			</div>
		{:else}
			<div class="flex justify-center items-center gap-2">
				<div class=""><strong>Displaying </strong>all content across wiki</div>
				<div><Icon src={GlobeAmericas} class="w-7 h-7 text-purple-500" solid /></div>
			</div>
		{/if}
	</div>

	<div class="my-5 flex justify-center px-4">
		<div class="flex items-center justify-center w-full gap-2">
			<div class=" flex w-full max-w-lg border border-neutral rounded p-3">
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

	<!-- <div class="uppercase flex gap-2 justify-center">
			{#each getDivisions() as division}
				<button
					class="border border-primary/25 py-1 px-2 uppercase my-2 hover:shadow transition-all duration-100 rounded"
					on:click={() => handleFilter(division)}>{division}</button
				>
			{/each}
		</div> -->

	{#if data.tags}
		<div class="flex items-center mx-4">
			<div class="">
				<label class="group cursor-pointer">
					<div
						class=" flex items-center gap-2 border border-neutral/50 group-hover:border-neutral/50 py-2.5 px-4 rounded group-hover:shadow-md transition-all duration-200"
					>
						<label class="swap swap-rotate">
							<input
								type="checkbox"
								bind:checked={$feedSelect}
								class="hidden checkbox border group-hover:border-neutral transition-all duration-500"
								on:click={handleFeedSelect}
							/>

							<div class="swap-on">
								<Icon src={UserGroup} class="w-7 h-7 " solid />
							</div>
							<div class="swap-off">
								<Icon src={GlobeAmericas} class="w-7 h-7 " solid />
							</div>
						</label>
					</div>
				</label>
			</div>

			<div class="ml-5 border-r h-16 border-neutral/50" />
			<div
				class="flex overflow-x-auto md:overflow-x-auto no-scrollbar md:justify-cener items-center gap-2 px-4"
			>
				{#each data.tags as tag}
					<button
						class="border border-neutral/25 py-1 px-2 uppercase my-2 hover:shadow transition-all duration-100 rounded"
						on:click={() => handleFilter(tag.name)}>{tag.name}</button
					>
				{/each}
			</div>

			<div class="border-l h-16 border-neutral/50" />
		</div>
	{/if}

	{#if $feedSelect}
		<div class="flex justify-center pt-4">
			<div class="flex flex-col w-full px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{#each data.pages as page}
					{#each data.users as user}
						{#if data.user.following.includes(page.user)}
							{#if !filter || page.name.toLowerCase().includes(filter.toLowerCase()) || page.tagline
									.toLowerCase()
									.includes(filter.toLowerCase()) || (Array.isArray(page.division) && page.division.some( (division) => division
												.toLowerCase()
												.includes(filter.toLowerCase()) )) || page.content
									.toLowerCase()
									.includes(filter.toLowerCase()) || user.name
									.toLowerCase()
									.includes(filter.toLowerCase()) || (page.expand && page.expand.tags && page.expand.tags.some( (tag) => tag.name
												.toLowerCase()
												.includes(filter.toLowerCase()) ))}
								{#if page.user === user.id}
									<MyPageItem
										{page}
										{user}
										localUser={data.user}
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
								.includes(filter.toLowerCase()) || (page.expand && page.expand.tags && page.expand.tags.some( (tag) => tag.name
											.toLowerCase()
											.includes(filter.toLowerCase()) ))}
							{#if page.user === user.id}
								<MyPageItem
									{page}
									{user}
									localUser={data.user}
									isNew={isNew(page.created)}
									isOld={isOld(page.updated)}
								/>
							{/if}
						{/if}
					{/each}
				{/each}
			</div>
		</div>
	{/if}
</div>
