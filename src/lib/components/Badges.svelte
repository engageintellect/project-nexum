<script>
	import { Modal } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	export let badges;
	export let userBadges;

	export let badgeSize;

	let modalOpen;
	$: modalOpen = false;
</script>

<div class="border border-neutral/10 rounded shadow">
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
								class="cursor-pointer md:hover:scale-[105%] transition-all duration-200 hover:saturate-150"
							>
								<div class="">
									{#if badge.thumbnail}
										<!-- svelte-ignore a11y-missing-attribute -->
										<img
											alt={badge.name}
											class={badgeSize}
											src={badge?.thumbnail
												? getImageURL(badge.collectionId, badge.id, badge.thumbnail, '0x0')
												: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${badge.name}`}
										/>
									{:else}
										loading...
									{/if}
								</div>
							</div>
							<div slot="heading">
								<div class="">
									<div class="w-full bg-purple-100 flex justify-center">
										<!-- svelte-ignore a11y-missing-attribute -->
										<img
											alt={badge.name}
											class="w-40 h-40"
											src={badge?.thumbnail
												? getImageURL(badge.collectionId, badge.id, badge.thumbnail, '0x0')
												: `https://via.placeholder.com/400/4506CB/FFFFFF/?text=${badge.name}`}
										/>
									</div>
								</div>

								<div class="text-2xl my-5">{badge.name}</div>
								<div class="text-base font-normal mt-2">
									{badge.description}
								</div>

								<div class="flex gap-2 justify-center mt-10 my-5">
									<div class="btn btn-info rounded">About Badges</div>

									<div class="btn btn-success rounded">Claim Prize!</div>
								</div>
							</div>
						</Modal>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
