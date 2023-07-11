<script>
	import { enhance } from '$app/forms';
	import PageCard from '$lib/components/PageCard.svelte';
	import { getImageURL } from '$lib/utils';
	import { Icon, MagnifyingGlass, XMark } from 'svelte-hero-icons';

	export let data;
	let filter;
	let user = data.user;

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

	const getPageLength = (pages) => {
		const total = pages.reduce((count, page) => {
			if (page.user === user.id) {
				return count + 1;
			}
			return count;
		}, 0);

		return total;
	};
</script>

<div class="my-10">
	<!-- USER DATA -->
	<div class="max-w-3xl mx-auto px-4 my-10 md:my-20">
		<div class="flex flex-col sm:flex-row gap-4 md:items-center justify-center">
			<div>
				<img
					class="w-24 md:w-32 rounded-full border border-primary group-hover:saturate-150 transition-color duration-300"
					src={data.user?.avatar
						? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
						: `https://ui-avatars.com/api/?name=${data.user?.name}`}
					alt="User avatar"
				/>
			</div>
			<div>
				<div class="text-2xl md:text-3xl font-semibold">
					{data.user.name}
				</div>
				<div class="text-lg md:text-xl font-thin">{data.user.job_title}</div>
				{#if data.user.division}
					<div class="badge md:badge-lg badge-primary rounded mt-2 uppercase py-3">
						{data.user.division}
					</div>
				{/if}
			</div>
		</div>
	</div>

	{#if getPageLength(data.pages) > 3}
		<div class="my-10 flex justify-center px-4">
			<div class="flex items-center justify-center w-full gap-2">
				<div class=" flex w-full max-w-lg border border-primary rounded p-3">
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
	{/if}

	<div class="flex justify-center pt-4">
		<div class="flex flex-col w-full px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
			<!-- TODO: I'm sure this could be cleaner, but I'm not sure how to do it. -->

			{#each data.pages as page}
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
		</div>
	</div>

	<!-- USER PAGES -->
</div>
