<script>
	import { feedSelect } from './../lib/store.js';
	import { Icon, MagnifyingGlass, XMark, GlobeAmericas, UserGroup } from 'svelte-hero-icons';
	import MyPageItem from '../lib/components/MyPageItem.svelte';
	import { isOld, isNew } from '../lib/utils.js';

	export let data;
	let filter;

	const handleFeedSelect = () => {
		$feedSelect = !$feedSelect;
	};

	const handleFilter = (value) => {
		filter = value;
	};

	let filteredPageNames = [];

	$: if (data && data.pages && filter) {
		filteredPageNames = data.pages
			.filter((page) => page.name.toLowerCase().includes(filter.toLowerCase()))
			.map((page) => ({
				name: page.name,
				user: page.user,
				division: page.division,
				id: page.id,
				content: page.content
			}));
	} else {
		filteredPageNames = [];
	}

	function goto(url) {
		return function () {
			window.location.href = url;
		};
	}

	let focusedIndex = -1;

	const handleKeyDown = (e) => {
		switch (e.key) {
			case 'ArrowDown':
				// Move focus down in the list
				if (focusedIndex < filteredPageNames.length - 1) {
					focusedIndex += 1;
				}
				break;
			case 'ArrowUp':
				// Move focus up in the list
				if (focusedIndex > 0) {
					focusedIndex -= 1;
				}
				break;
			case 'Enter':
				// Trigger the click action for the currently focused item
				if (filteredPageNames[focusedIndex]) {
					goto(`/pages/${filteredPageNames[focusedIndex].id}`)();
				}
				break;
		}
	};
</script>

<div>
	<div class="mt-10 text-center text-7xl lg:text-9xl font-bold tracking-tight text-base-content">
		<div>
			Ne<span class="text-purple-500">x</span>um
		</div>
	</div>
	<div class="text-center my-5">
		{#if $feedSelect}
			<div class="flex justify-center items-center gap-2">
				<div class="">
					<strong>Displaying </strong>content you are
					<span class="text-purple-500 font-bold">following</span>
				</div>
				<div><Icon src={UserGroup} class="w-7 h-7 text-purple-500" solid /></div>
			</div>
		{:else}
			<div class="flex justify-center items-center gap-2">
				<div class=""><strong>Displaying </strong>all content</div>
				<div><Icon src={GlobeAmericas} class="w-7 h-7 text-purple-500" solid /></div>
			</div>
		{/if}
	</div>

	<div class=" my-5 flex justify-center px-4">
		<div class=" flex items-center justify-center w-full gap-2">
			<div class=" flex w-full max-w-lg border border-neutral/10 rounded p-3">
				<div class="relative flex items-center gap-2 w-full">
					<Icon src={MagnifyingGlass} class=" text-neutral w-5 h-5" />
					<!-- svelte-ignore a11y-autofocus -->
					<input
						type="text"
						placeholder="Search Pages, People, Divisions, and Content"
						class="w-full focus:outline-none bg-base-100"
						bind:value={filter}
						on:keydown={handleKeyDown}
						autofocus
					/>
					{#if filter}
						<button class="focus:outline-none md:hover:scale-110" on:click={() => (filter = '')}>
							<Icon src={XMark} class="w-5 h-5" />
						</button>
					{/if}

					<!-- Dropdown for filtered page names -->
					{#if filteredPageNames.length > 0}
						<div
							class="absolute z-50 top-full mt-5 w-full bg-base-100 border border-neutral/10/50 rounded shadow-xl"
						>
							<div class="p-2 capitalize">Pages that match your search...</div>
							{#each filteredPageNames as page, index}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<a href={`/pages/${page.id}`} class="">
									<div
										class="border border-neutral/10 p-2 hover:bg-neutral cursor-pointer {focusedIndex ===
										index
											? 'bg-neutral/10'
											: ''}"
									>
										<div class="flex items-center">
											<!-- <div>
											<Icon src={DocumentText} class=" text-primary w-5 h-5" solid />
										</div> -->

											{#if page.division != ''}
												<div
													class="badge font-semibold badge-primary scale-[80%] rounded py-3 w-1/6"
												>
													{page.division}
												</div>
											{/if}

											<div class="w-full">
												{page.name}
											</div>
										</div>
									</div>
								</a>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	{#if data.tags}
		<div class="flex items-center mx-4">
			<div class="pl-2">
				<label class="group cursor-pointer">
					<div class="btn">
						<label class="swap swap-rotate">
							<input
								type="checkbox"
								bind:checked={$feedSelect}
								class="hidden checkbox border group-hover:border-neutral/10 transition-all duration-500"
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

			<div class="ml-4 border-r h-16 border-neutral/10" />
			<div
				class="flex overflow-x-auto py-2 md:overflow-x-auto no-scrollbar md:justify-cener items-center gap-2 px-4 w-full"
			>
				{#each data.tags as tag}
					<button class="btn btn-sm lowercase shadow" on:click={() => handleFilter(tag.name)}
						>{tag.name}</button
					>
				{/each}
			</div>

			<div class="border-l h-16 border-neutral/10" />
		</div>
	{/if}

	{#if $feedSelect}
		<div class="flex justify-center pt-4">
			<div class="flex flex-col w-full px-4 sm:grid sm:grid-cols-2 gap-5">
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
			<div class="flex flex-col w-full px-4 sm:grid sm:grid-cols-2 gap-5">
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
