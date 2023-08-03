<script>
	import PageCardBadge from '$lib/components/PageCardBadge.svelte';
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import toast from 'svelte-french-toast';
	import MyPageItem from '$lib/components/MyPageItem.svelte';

	import { Icon, PencilSquare, Trash, Check, ArrowPathRoundedSquare } from 'svelte-hero-icons';

	export let page;
	export let user;
	export let localUser;

	export let isNew = false;
	export let isOld = false;

	let modalOpen;
	let loading = false;

	const openModal = (event) => {
		event.stopPropagation();
		modalOpen = true;
	};

	const submitDeletePage = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Page deleted successfully!');
					await update();
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

	const dateTimeString = page.updated;
	const dateTime = new Date(dateTimeString);

	const options = {
		timeZone: 'America/Los_Angeles', // Specify the desired time zone
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};

	const formattedDateTime = dateTime.toLocaleString('en-US', options);

	console.log(formattedDateTime);
</script>

<div class="flex w-full rounded border border-primary/50 shadow hover:shadow-lg group">
	<div class="w-full flex items-center rounded">
		<div class="w-full h-full avatar rounded">
			<div class="object-cover rounded-l w-full">
				<div class="relative flex h-full border-r border-primary/50 w-full bg-black">
					<a href={`/pages/${page.id}`}>
						<img
							class="group-hover:opacity-50 group-hover:scale-105 transition-all duration-200 group-hover:saturate-150"
							src={page?.thumbnail
								? getImageURL(page.collectionId, page.id, page.thumbnail, '80x80')
								: `https://via.placeholder.com/500/6d28d9/FFFFFF/?text=${page.name}`}
							alt="page thumbnail"
						/>
					</a>
					<div
						class="absolute right-0 h-full md:opacity-0 md:group-hover:opacity-100 transition-all duration-500"
					>
						{#if page.user === localUser.id}
							<div class="h-full">
								<div
									class="w-full bg-primary gap-2 flex flex-col justify-between md:justify-start items-end p-1 h-full"
								>
									<a href="/pages/{page.id}/edit" class="">
										<Icon
											src={PencilSquare}
											class="w-7 h-7 text-base-100 hover:text-warning shadow"
											solid
										/>
									</a>
									<Modal label={page.id} checked={modalOpen}>
										<div slot="trigger" class="">
											<button
												class="w-7 h-7 hover:cursor-pointer text-base-100 hover:text-error shadow"
												on:click|stopPropagation={openModal}
											>
												<Icon src={Trash} solid />
											</button>
										</div>
										<div slot="heading">
											<div class="text-2xl">Delete {page.name}</div>
											<div class="text-base font-normal mt-2">
												Are you sure you want to delete this page? Once deleted, the page cannot be
												restored.
											</div>
										</div>
										<div slot="actions" class="flex w-full items-center justify-center space-x-2">
											<button
												class="btn btn-outline"
												on:click|stopPropagation={() => (modalOpen = false)}>Cancel</button
											>
											<form action="?/deletePage" method="POST" use:enhance={submitDeletePage}>
												<input type="hidden" name="id" value={page.id} />
												<button type="submit" class="btn btn-error z-40" disabled={loading}
													>Delete</button
												>
											</form>
										</div>
									</Modal>
								</div>
							</div>
						{/if}
					</div>
				</div>
				{#if page.verified}
					<div class="">
						<Icon src={Check} class="absolute bottom-2 left-2 w-6 h-6 bg-success rounded-full" />
					</div>
				{/if}
			</div>
		</div>
		<div class="w-full h-full p-2">
			<a href="/pages/{page.id}" class="">
				<div class="flex flex-col justify-between h-full">
					<div>
						<div class=" font-bold">{page.name}</div>
						<div class=" text-sm text-primary/75">{page.tagline}</div>
						{#if page.division != ''}
							<div class="badge badge-sm badge-primary rounded py-3 mt-2">{page.division}</div>
						{/if}
					</div>

					<div class="flex flex-col gap-2 mt-5">
						{#if user}
							<div class="flex items-center gap-1">
								<img
									class="w-6 h-6 object-cover rounded-full border border-primary group-hover:saturate-150 transition-color duration-300"
									src={user?.avatar
										? getImageURL(user?.collectionId, user?.id, user?.avatar)
										: `https://ui-avatars.com/api/?name=${user?.name}`}
									alt="User avatar"
								/>

								<div class="text-sm text-primary/75">{user.name}</div>
							</div>
						{/if}

						<div class="font-bold text-xs">
							<div class="flex gap-1">
								<Icon src={ArrowPathRoundedSquare} class="w-4 h-4" />
								<div class="font-medium text-primary/75">{formattedDateTime}</div>
							</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	</div>
</div>
