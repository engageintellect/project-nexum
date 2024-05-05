<script>
	import { fade } from 'svelte/transition';
	import { PUBLIC_HOME_URL, PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { enhance } from '$app/forms';
	import { getImageURL } from '$lib/utils';
	import { Modal } from '$lib/components';

	import {
		Icon,
		Heart,
		HandThumbUp,
		Share,
		PencilSquare,
		ArrowPathRoundedSquare,
		CheckCircle,
		Clock,
		Trash
	} from 'svelte-hero-icons';
	import readtime from 'read-time';
	export let data;

	import Toc from 'svelte-toc';

	import toast from 'svelte-french-toast';
	let modalOpen;
	let loading = false;

	import { onMount } from 'svelte';

	onMount(async () => {
		try {
			const pageLogData = {
				page: data.page.id,
				user: data.user.id,
				username: data.user.name,
				pagename: data.page.name
			};

			const response = await fetch('/api/pageLog', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(pageLogData)
			});

			if (response.ok) {
				const result = await response.json();
				console.log(result);
			} else {
				const errorData = await response.json();
				console.error('Failed to log data:', errorData.message);
			}
		} catch (error) {
			console.error('Error occurred:', error);
		}
	});

	const submitDeletePage = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Page deleted successfully!');
					await update();
					toast('Returning Home...');
					window.location.href = '/'; // this redirects to the root route
					break;
				case 'error':
					toast.error('Could not delete page. Try again later.');
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

	$: modalOpen = false;

	const readTime = readtime(data.page.content);

	const dateTimeString = data.page.updated;
	const dateTime = new Date(dateTimeString);

	const options = {
		timeZone: 'America/Los_Angeles', // Specify the desired time zone
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};

	const formattedDateTime = dateTime.toLocaleString('en-US', options);

	const getTotalLikes = (users, pages) => {
		const total = users.reduce((count, user) => {
			if (user.likes.includes(pages.id)) {
				return count + 1;
			}
			return count;
		}, 0);

		return total;
	};

	const getTotalFavorites = (users, pages) => {
		const total = users.reduce((count, user) => {
			if (user.favorites.includes(pages.id)) {
				return count + 1;
			}
			return count;
		}, 0);

		return total;
	};
</script>

<!-- Spinner displayed while loading -->

<div in:fade={{ duration: 500 }} class="flex">
	<div
		class="flex flex-col w-full max-w-full mx-auto px-4 py-4 md:border border-neutral/10 rounded md:shadow"
	>
		<div class="flex gap-2 items-center mb-2">
			<!-- VERIFIED -->
			{#if data.page.verified}
				<div class="badge badge-sm badge-success rounded-full py-3">
					<div class="flex gap-1 items-center justify-center">
						<div>
							<Icon src={CheckCircle} class=" w-5 h-5" />
						</div>
						<div class="uppercase font-semibold">verified</div>
					</div>
				</div>
			{/if}

			<!-- DIVISION -->
			{#if data.page.division != ''}
				<div class="badge border-neutral/10 rounded py-3 uppercase">{data.page.division}</div>
			{/if}
		</div>

		<!-- TITLE -->
		<div class="py-2">
			<div class="text-5xl font-bold">
				{data.page.name}<span />
			</div>

			<div class="text-xl font-light mt-0 text-primary/70">{data.page.tagline}</div>
		</div>
		<!-- <div>
			<div class="mt-1">
				<a class="text-primary hover:underline" target="_blank" href={data.page.url}
					>{data.page.url}</a
				>
			</div>
		</div> -->

		<!-- DATE -->
		<div class="mt-2 flex flex-col md:flex-row md:gap-5">
			<div class="font-medium flex items-center gap-2">
				<Icon src={ArrowPathRoundedSquare} class="w-4 h-4" />
				<div class="font-thin text-sm md:text-md">
					{formattedDateTime}.
				</div>
			</div>

			<div class="text-sm md:text-md font-bold primary-content">
				<div class="flex gap-2 items-center">
					<div>
						<Icon src={Clock} class=" w-4 h-4" />
					</div>

					<div>
						{readTime.text}.
					</div>
				</div>
			</div>
		</div>

		<!-- CREATOR -->
		{#each data.users as creator}
			{#if creator.id === data.page.user}
				<div class="flex gap-2 my-5">
					<div class="flex items-start gap-4">
						<div class="relative">
							<a href={`/people/${creator.id}`}>
								<img
									class="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border border-neutral/10 hover:saturate-150 hover:scale-[102%] transition-all duration-50 active:scale-[98%]"
									src={creator?.avatar
										? getImageURL(creator?.collectionId, creator?.id, creator?.avatar)
										: `https://ui-avatars.com/api/?name=${creator?.name}`}
									alt="User avatar"
								/>
							</a>
						</div>

						<div class="flex flex-col justify-center">
							<div class="text-lg font-semibold primary-content">
								{creator.name}
							</div>
							<div class="text-sm font-medium secondary-content">{creator.job_title}</div>
							{#if creator.division}
								<div class="badge badge-sm badge-neutral uppercase rounded py-3 mt-2">
									{creator.division}
								</div>
							{/if}

							{#if creator.id != data.user.id}
								<div class="my-2">
									<form action="?/followUser" method="POST" use:enhance>
										<button type="submit" class="active:scale-[98%] transition-all duration-200">
											<input type="hidden" name="id" value={creator.id} />
											<div>
												{#if data.user.following.includes(creator.id)}
													<input type="hidden" name="follow" value="true" />
													<button class="flex btn btn-xs btn-success capitalize rounded">
														<!-- <Icon src={CheckCircle} class="text-primary w-5 h-5" solid /> -->

														<div class="flex gap-2 items-center">
															<div>Following</div>
														</div>
													</button>
												{:else}
													<input type="hidden" name="follow" value="false" />

													<button class="flex btn btn-xs capitalize rounded">
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
			{/if}
		{/each}

		<!-- PAGE METAGS -->
		<div
			class="flex md:items-center flex-col gap-2 md:flex-row justify-between sticky top-0 z-50 bg-base-100 p-2 -mx-2"
		>
			<!-- <div class="sticky bg-base-100 flex md:items-center flex-col gap-2 md:flex-row justify-between"> -->
			<!-- TAGS -->
			<div class="flex flex-wrap gap-1">
				{#if data.page.expand.tags}
					{#each data.page.expand.tags as tag}
						<div class="btn btn-sm text-sm lowercase shadow">{tag.name}</div>
					{/each}
				{/if}
			</div>

			<!-- ACTION BUTTONS -->
			<div class="flex gap-5 items-center">
				<div class="flex items-center gap-2">
					<!-- LIKE -->
					<form action="?/likePage" method="POST" use:enhance>
						<button
							type="submit"
							class="hover:scale-105 active:scale-95 transition-all duration-200 flex items-center tooltip"
						>
							<input type="hidden" name="id" value={data.page.id} />
							<div>
								{#if data.user.likes.includes(data.page.id)}
									<input type="hidden" name="like" value="true" />
									<Icon src={HandThumbUp} class="text-info w-7 h-7" solid />
								{:else}
									<input type="hidden" name="like" value="false" />
									<Icon src={HandThumbUp} class="text-neutral w-7 h-7" />
								{/if}
							</div>
						</button>
					</form>
					{getTotalLikes(data.users, data.page)}
				</div>

				<!-- FAVORITE -->
				<div class="flex items-center gap-2">
					<form action="?/favoritePage" method="POST" use:enhance>
						<button
							type="submit"
							class="hover:scale-105 active:scale-95 transition-all duration-200 flex items-center"
						>
							<input type="hidden" name="id" value={data.page.id} />
							<div>
								{#if data.user.favorites.includes(data.page.id)}
									<input type="hidden" name="favorite" value="true" />
									<Icon src={Heart} class="text-error w-7 h-7" solid />
								{:else}
									<input type="hidden" name="favorite" value="false" />
									<Icon src={Heart} class="text-neutral w-7 h-7" />
								{/if}
							</div>
						</button>
					</form>
					{getTotalFavorites(data.users, data.page)}
				</div>

				<!-- SHARE -->
				<!-- TODO: CHANEGE TO SOMETHING LIKE SENDGRID TO MAKE LINK CLICKABLE IN EMAIL CLIENT -->
				<div>
					<a
						href={`mailto:?subject=Nexum: ${data.page.name}&body=${PUBLIC_HOME_URL}/pages/${data.page.id}`}
					>
						<Icon
							src={Share}
							class="text-content-neutral w-7 h-7 hover:scale-105 active:scale-95 transition-all duration-200"
						/>
					</a>
				</div>

				<!-- EDIT -->
				{#if data.page.user === data.user.id}
					<a href="/pages/{data.page.id}/edit">
						<Icon
							src={PencilSquare}
							class="text-content-neutral w-7 h-7 hover:scale-105 active:scale-95 transition-all duration-200"
						/>
					</a>
				{/if}

				<!-- DELETE -->
				{#if data.page.user === data.user.id}
					<div class="">
						<Modal label={data.page.id} checked={modalOpen}>
							<span slot="trigger" class="cursor-pointer">
								<Icon
									src={Trash}
									class="text-content-neutral w-7 h-7 hover:scale-105 active:scale-95 transition-all duration-200"
								/>
							</span>
							<div slot="heading">
								<div class="text-2xl">Delete {data.page.name}</div>
								<div class="text-base font-normal mt-2">
									Are you sure you want to delete this page? Once deleted, the page cannot be
									restored.
								</div>
							</div>
							<div slot="actions" class="flex w-full items-center justify-center space-x-2">
								<label for={data.page.id} class="btn btn-outline">Cancel</label>
								<form action="/?/deletePage" method="POST" use:enhance={submitDeletePage}>
									<input type="hidden" name="id" value={data.page.id} />
									<button type="submit" class="btn btn-error" disabled={loading}>Delete</button>
								</form>
							</div>
						</Modal>
					</div>
				{/if}
			</div>
		</div>

		<!-- IMAGE -->
		{#if data.page.thumbnail}
			<div class="avatar">
				<div class="w-full h-64 md:h-96 rounded shadow-lg">
					<img
						in:fade={{ duration: 200 }}
						class=""
						src={data.page?.thumbnail
							? getImageURL(data.page.collectionId, data.page.id, data.page.thumbnail, '0x0')
							: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${data.page.name}`}
						alt="page thumbnail"
					/>
				</div>
			</div>

			<!-- CONTENT -->
			<div class="mt-10 page-content overflow-x-hidden">
				{@html data.page.content}
			</div>
		{:else}
			<div class="page-content overflow-x-hidden">
				{@html data.page.content}
			</div>
		{/if}
	</div>

	<!-- TOC -->
	<div class="hidden md:flex justify-start">
		<Toc title={'Page Contents'} autoHide={true} />
	</div>
</div>
