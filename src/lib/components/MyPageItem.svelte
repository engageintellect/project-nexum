<script>
	import { fade } from 'svelte/transition';
	import PageCardBadge from '$lib/components/PageCardBadge.svelte';
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import { getImageURL, getFormattedDateTime } from '$lib/utils';
	import toast from 'svelte-french-toast';
	import { Icon, PencilSquare, Trash, Check, ArrowPathRoundedSquare } from 'svelte-hero-icons';
	export let page;
	export let user;
	export let localUser;
	export let isNew = false;
	export let isOld = false;
	const formattedDateTime = getFormattedDateTime(page.updated);
	let modalOpen;
	let loading = false;

	const openModal = () => {
		modalOpen = true;
	};

	const submitDeletePage = () => {
		loading = true;
		return async ({ result, update }) => {
			if (result.type === 'success') {
				toast.success('Page deleted successfully!');
				await update();
			} else {
				toast.error('Could not delete page. Try again later.');
			}

			loading = false;
		};
	};

	$: modalOpen = false;
</script>

<div
	in:fade={{ duration: 100 }}
	class="flex w-full rounded border border-neutral/10 hover:border-neutral/10/50 transition-all duration-100 hover:shadow-lg group"
>
	<div class="w-full flex gap-0 items-center rounded">
		<div class="w-full h-full avatar rounded">
			<div class="relative object-cover rounded-l w-full">
				<div class=" flex h-full border-r w-full bg-black">
					{#if isNew}
						<PageCardBadge msg={'NEW!'} {isNew} />
					{/if}

					{#if isOld}
						<PageCardBadge msg={'STALE'} {isOld} />
					{/if}

					<a href={`/pages/${page.id}`} class="">
						<img
							class="group-hover:opacity-50 group-hover:scale-105 transition-all duration-500 group-hover:saturate-150"
							src={page?.thumbnail
								? getImageURL(page.collectionId, page.id, page.thumbnail, '80x80')
								: `https://via.placeholder.com/500/6d28d9/FFFFFF/?text=${page.name}`}
							alt="page thumbnail"
						/>
					</a>
					<div
						class="absolute right-0 h-full shadow md:opacity-0 md:group-hover:opacity-100 transition-all duration-700"
					>
						{#if page.user === localUser.id}
							<div class="h-full">
								<div
									class="w-full bg-neutral gap-2 flex flex-col justify-between md:justify-start items-end p-2 h-full"
								>
									<a href="/pages/{page.id}/edit" class="">
										<Icon
											src={PencilSquare}
											class="w-5 h-5 md:w-6 md:h-6 text-base-100 hover:text-warning"
											solid
										/>
									</a>

									<Modal label={page.id} checked={modalOpen}>
										<div slot="trigger" class="">
											<button
												class="w-5 h-5 md:w-6 md:h-6 hover:cursor-pointer text-base-100 hover:text-error"
												on:click={openModal}
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
											<button class="btn btn-outline" on:click={() => (modalOpen = false)}
												>Cancel</button
											>
											<form action="/?/deletePage" method="POST" use:enhance={submitDeletePage}>
												<input type="hidden" name="id" value={page.id} />
												<button type="submit" class="btn btn-error" disabled={loading}
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
						<Icon
							src={Check}
							class="absolute bottom-2 left-2 w-6 h-6 bg-success group-hover:animate-pulse rounded"
						/>
					</div>
				{/if}
			</div>
		</div>
		<div class="w-full h-full p-2">
			<a href="/pages/{page.id}" class="">
				<div class="flex flex-col justify-between h-full">
					<div>
						<div class="text-xl font-bold line-clamp-2">{page.name}</div>
						<div class=" text-sm text-base-content/50 line-clamp-2">{page.tagline}</div>
						{#if page.division != ''}
							<div class="badge badge-sm badge-neutral rounded py-3 mt-2">{page.division}</div>
						{/if}
					</div>

					<div class="flex flex-col gap-2 mt-5">
						{#if user}
							<div class="flex items-center gap-1">
								<img
									class="w-6 h-6 object-cover rounded-full border border-neutral/10 group-hover:saturate-150 transition-color duration-300"
									src={user?.avatar
										? getImageURL(user?.collectionId, user?.id, user?.avatar)
										: `https://ui-avatars.com/api/?name=${user?.name}`}
									alt="User avatar"
								/>

								<div class="text-sm text-base-content/75">{user.name}</div>
							</div>
						{/if}

						<div class="font-bold text-xs">
							<div class="flex gap-1">
								<Icon src={ArrowPathRoundedSquare} class="w-4 h-4" />
								<div class="font-medium text-base-content/75">{formattedDateTime}</div>
							</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	</div>
</div>
