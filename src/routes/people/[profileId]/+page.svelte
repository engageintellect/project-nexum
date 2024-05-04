<script>
	import { writable } from 'svelte/store';
	import { enhance } from '$app/forms';
	import PageCard from '$lib/components/PageCard.svelte';
	import { getImageURL } from '$lib/utils';
	import {
		Icon,
		MagnifyingGlass,
		XMark,
		InformationCircle,
		PlusCircle,
		CheckCircle
	} from 'svelte-hero-icons';
	import MyPageItem from '$lib/components/MyPageItem.svelte';
	import Badges from '$lib/components/Badges.svelte';

	export let data;
	let filter = '';
	let pageCount = 0;

	const countUserPages = (pages) => {
		for (let i = 0; i < pages.length; i++) {
			if (pages[i].user === data.pageUser.id) {
				pageCount++;
			}
		}
		return pageCount;
	};

	// Create the writable store for userPageCount
	export const userPageCount = writable(0);

	const MS_PER_DAY = 1000 * 60 * 60 * 24;

	const dateDiffInDays = (date1, date2) => Math.floor((date1 - date2) / MS_PER_DAY);

	const isOld = (date) => dateDiffInDays(new Date(), new Date(date)) > 30;

	const isNew = (date) => dateDiffInDays(new Date(), new Date(date)) < 1;

	const pageBelongsToUser = (page) => page.user === data.pageUser.id;

	// Set the value of userPageCount in your component
	userPageCount.set(data.pages.filter(pageBelongsToUser).length);

	$: filteredPages = filter
		? data.pages.filter((page) => {
				// filtering code
		  })
		: data.pages;
</script>

<div class="my-5 sm:my-10">
	<!-- USER DATA -->
	<div class="max-w-3xl mx-auto px-4">
		<div class="flex flex-col sm:flex-row gap-2 md:items-center justify-center">
			<div>
				<img
					class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border border-neutral/10 group-hover:saturate-150 transition-color duration-300"
					src={data.pageUser?.avatar
						? getImageURL(data.pageUser?.collectionId, data.pageUser?.id, data.pageUser?.avatar)
						: `https://ui-avatars.com/api/?name=${data.pageUser?.name}`}
					alt="User avatar"
				/>
			</div>
			<div>
				<div class="text-2xl md:text-3xl font-semibold capitalize">
					{data.pageUser.name}
				</div>
				<div class="text-lg md:text-xl font-thin capitalize">{data.pageUser.job_title}</div>
				{#if data.pageUser.division}
					<div class="badge md:badge-lg badge-primary rounded mt-2 uppercase py-3">
						{data.pageUser.division}
					</div>
				{/if}

				{#if data.user.id != data.pageUser.id}
					<div class="mt-5 sm:mt-2">
						<form action="?/followUser" method="POST" use:enhance>
							<button
								type="submit"
								class="w-full sm:w-auto active:scale-[98%] transition-all duration-200"
							>
								<input type="hidden" name="id" value={data.pageUser.id} />
								<div>
									{#if data.user.following.includes(data.pageUser.id)}
										<input type="hidden" name="follow" value="true" />
										<button class="flex w-full btn sm:btn-sm btn-success rounded capitalize">
											<!-- <Icon src={CheckCircle} class="text-primary w-5 h-5" solid /> -->
											<div>Following</div>
										</button>
									{:else}
										<input type="hidden" name="follow" value="false" />

										<button class="flex w-full btn sm:btn-sm rounded capitalize">
											<!-- <Icon src={PlusCircle} class="text-primary w-5 h-5" /> -->
											<div>Follow</div>
										</button>
									{/if}
								</div>
							</button>
						</form>
					</div>
				{/if}
			</div>
		</div>
	</div>

	{#if countUserPages(data.pages) > 0}
		<div class="mt-5 sm:my-10 flex justify-center px-4">
			<div class="flex items-center justify-center w-full gap-2">
				<div class=" flex w-full max-w-lg border border-neutral/10 rounded p-3">
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
	{/if}

	{#if !countUserPages(data.pages) > 0}
		<div class="flex justify-center px-4 mt-5 sm:my-10">
			<div class="alert alert-info max-w-lg">
				<Icon src={InformationCircle} class="w-5 h-5" />
				<span class=" capitalize">{data.pageUser.name} hasn't created any pages yet.</span>
			</div>
		</div>
	{:else}
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
							.includes(filter.toLowerCase()) || (page.expand.tags && page.expand.tags.some( (tag) => tag.name
										.toLowerCase()
										.includes(filter.toLowerCase()) ))}
						{#if page.user === data.pageUser.id}
							<MyPageItem
								{page}
								user={data.pageUser}
								localUser={data.user}
								isNew={isNew(page.created)}
								isOld={isOld(page.updated)}
							/>
						{/if}
					{/if}
				{/each}
			</div>
		</div>
	{/if}

	<!-- USER PAGES -->
</div>
