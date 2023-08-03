<script>
	import { getImageURL } from '$lib/utils';
	import Modal from '$lib/components/Modal.svelte';
	export let name;
	export let title;
	export let division;
	export let avatar;

	export let pageCount;
	export let pageLikes;
	export let pageFavorites;

	export let userBadges;
	export let badges;

	export let followers;
	export let following;

	let modalOpen;

	$: modalOpen = false;

	import {
		Icon,
		Trash,
		Heart,
		HandThumbUp,
		UserGroup,
		UserPlus,
		PencilSquare
	} from 'svelte-hero-icons';

	import { fade } from 'svelte/transition';
</script>

<div in:fade class=" mx-4 my-5 md:my-10">
	<div class="flex flex-col md:items-center md:flex-row gap-5">
		<img
			src={avatar}
			alt="pic"
			class="object-cover h-24 w-24 sm:h-32 sm:w-32 md:h-52 md:w-52 rounded-full border border-primary/50 shadow"
		/>

		<div class="w-full flex-col">
			<div class="text-2xl md:text-3xl font-semibold capitalize">
				{name}
			</div>
			<div class="text-lg md:text-xl font-thin capitalize">{title}</div>
			{#if division}
				<div class="badge md:badge-lg badge-primary rounded mt-2 uppercase py-3">
					{division}
				</div>
			{/if}
		</div>

		<div class="w-full flex justify-center flex-col gap-2 my-5 md:my-10">
			<div class="text-lg md:text-xl font-bold">User Stats</div>

			<div class="flex flex-row sm:flex-col">
				<a
					href="#mypages"
					class=" w-full justify-between shadow rounded p-2 px-4 flex gap-5 items-center"
				>
					<div class="flex flex-col w-full">
						<div class="capitalize text-sm font-thin">Pages</div>
						<div class="flex justify-between items-center">
							<div class="text-xl sm:text-2xl md:text-3xl font-extrabold">{pageCount || '0'}</div>

							<Icon
								src={PencilSquare}
								class="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-primary"
								solid
							/>
						</div>
						<div class="hidden sm:flex text-xs">Total pages created.</div>
					</div>
				</a>

				<div class="w-full justify-between shadow rounded p-2 px-4 flex gap-5 items-center">
					<div class="flex flex-col w-full">
						<div class="capitalize text-sm font-thin">Followers</div>
						<div class="flex justify-between items-center">
							<div class="text-xl sm:text-2xl md:text-3xl font-extrabold">{followers || '0'}</div>
							<Icon
								src={UserGroup}
								class="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-primary"
								solid
							/>
						</div>
						<div class="hidden sm:flex text-xs">Total users.</div>
					</div>
				</div>

				<div class="w-full justify-between shadow rounded p-2 px-4 flex gap-5 items-center">
					<div class="flex flex-col w-full">
						<div class="capitalize text-sm font-thin">Following</div>
						<div class="flex justify-between items-center">
							<div class="text-xl sm:text-2xl md:text-3xl font-extrabold">{following || '0'}</div>
							<Icon
								src={UserPlus}
								class="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-primary"
								solid
							/>
						</div>
						<div class="hidden sm:flex text-xs">Total users.</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	{#if badges}
		<div class="mb-5 md:mb-10">
			<div class="w-full font-bold text-lg md:text-xl">Badges</div>
			<div class="flex overflow-x-auto overflow-y-hidden hide-scrollbar">
				<!-- Step 1: Add overflow-x-auto class -->
				{#each badges as badge}
					{#if userBadges.includes(badge.id)}
						<div class="flex-shrink-0">
							<!-- Step 2: Add flex-shrink-0 class to prevent badges from shrinking -->
							<div>
								<Modal label={badge.name} checked={modalOpen}>
									<div
										slot="trigger"
										class="cursor-pointer hover:scale-[102%] transition-all duration-200 hover:saturate-150"
									>
										<div class="">
											<img
												class="w-16 h-16"
												src={badge?.thumbnail
													? getImageURL(badge.collectionId, badge.id, badge.thumbnail, '0x0')
													: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${page.name}`}
												alt="page thumbnail"
											/>
										</div>
									</div>
									<div slot="heading">
										<div class="">
											<div class="w-full bg-purple-100 flex justify-center">
												<img
													class="w-40 h-40"
													src={badge?.thumbnail
														? getImageURL(badge.collectionId, badge.id, badge.thumbnail, '0x0')
														: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${page.name}`}
													alt="page thumbnail"
												/>
											</div>
										</div>

										<div class="text-2xl my-5">{badge.name}</div>
										<div class="text-base font-normal mt-2">
											{badge.description}
										</div>

										<div class="flex gap-2 justify-center mt-10 my-5">
											<div class="btn btn-info">About Badges</div>

											<div class="btn btn-success">Claim Prize!</div>
										</div>
									</div>
								</Modal>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
