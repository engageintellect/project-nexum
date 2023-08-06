<script>
	import { getImageURL } from '$lib/utils';
	import Modal from '$lib/components/Modal.svelte';
	export let name;
	export let userId;
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
	import Stat from './Stat.svelte';
	import Badges from './Badges.svelte';
</script>

<div in:fade class=" mx-4 my-5 md:my-10">
	<div class="flex flex-col lg:items-center lg:flex-row gap-5">
		<div class="flex flex-col md:flex-row md:items-center w-full gap-2">
			<img
				src={avatar}
				alt="pic"
				class="object-cover h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full border border-primary/50 shadow"
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
		</div>

		<div class="w-full flex justify-center flex-col gap-2">
			<div
				class="text-lg md:text-xl font-bold badge badge-outline text-neutral/75 py-3 rounded uppercase mt-10 md:my-0"
			>
				User Stats
			</div>
			<div class="flex flex-col gap-5">
				<div class="flex">
					<div class="w-full">
						<Stat
							statTitle="Pages"
							pageLink={`/people/${userId}`}
							statValue={pageCount || '0'}
							statDescription="Total pages."
						>
							<Icon src={PencilSquare} class="w-5 h-5 sm:w-7 sm:h-7" solid />
						</Stat>
					</div>

					<div class="w-full">
						<Stat
							statTitle="Followers"
							pageLink={`/people/following${userId}`}
							statValue={followers || '0'}
							statDescription="Total Followers."
						>
							<Icon src={UserGroup} class="w-5 h-5 sm:w-7 sm:h-7" solid />
						</Stat>
					</div>

					<div class="w-full">
						<Stat
							statTitle="Following"
							pageLink={`/people/${userId}`}
							statValue={following || '0'}
							statDescription="Total Following."
						>
							<Icon src={UserPlus} class="w-5 h-5 sm:w-7 sm:h-7" solid />
						</Stat>
					</div>
				</div>

				<div class="w-full flex flex-col gap-2">
					<div
						class="font-bold text-lg md:text-xl badge badge-outline text-neutral/75 py-3 rounded uppercase"
					>
						Badges
					</div>
					<Badges {badges} {userBadges} badgeSize={'w-16 h-16'} />
				</div>
			</div>
		</div>
	</div>

	<!-- <div class="mb-5 md:mb-10">
		<div class="w-full">
			<div class="font-bold text-lg md:text-xl badge badge-outline py-3 rounded">Badges</div>
			<Badges {badges} {userBadges} badgeSize={'w-16 h-16'} />
		</div>
	</div> -->
</div>
