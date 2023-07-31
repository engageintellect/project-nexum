<script>
	export let name;
	export let title;
	export let division;
	export let avatar;

	export let pageCount;
	export let pageLikes;
	export let pageFavorites;

	export let followers;
	export let following;

	import { Icon, Heart, HandThumbUp, UserGroup, UserPlus, PencilSquare } from 'svelte-hero-icons';

	import { fade } from 'svelte/transition';
</script>

<div in:fade class=" mx-4 my-10">
	<div class="flex flex-col md:items-center md:flex-row gap-5">
		<img
			src={avatar}
			alt="pic"
			class="object-cover h-24 w-24 sm:h-32 sm:w-32 md:h-52 md:w-52 rounded-full border border-primary/50 shadow"
		/>
		<!-- <div class="w-full flex-col">
			<div class="font-bold text-lg">{name || 'stranger'}</div>
			<div class="font-thin">{title || 'title'}</div>
			<div class="badge badge-primary uppercase py-3 rounded">
				{division || 'division'}
			</div>
		</div> -->

		<div class="w-full flex-col">
			<div class="text-2xl font-semibold capitalize">
				{name || 'stranger'}
			</div>
			<div class="text-lg font-thin capitalize">{title || 'title'}</div>
			{#if division}
				<div class="badge badge-primary rounded mt-2 uppercase py-3">
					{division}
				</div>
			{/if}
		</div>

		<div class="w-full flex flex-col gap-2">
			<div class="text-xl font-bold">User Stats</div>
			<a
				href="#mypages"
				class="w-full justify-between shadow rounded p-2 px-5 flex gap-5 items-center"
			>
				<div class="flex flex-col">
					<div class="capitalize text-sm font-thin">Pages</div>
					<div class="text-2xl md:text-3xl font-extrabold">{pageCount || '0'}</div>
					<div class="text-xs">Total pages created.</div>
				</div>
				<Icon src={PencilSquare} class="w-7 h-7 md:w-12 md:h-12 text-primary" solid />
			</a>

			<div class="w-full justify-between shadow rounded p-2 px-5 flex gap-5 items-center">
				<div class="flex flex-col">
					<div class="capitalize text-sm font-thin">Followers</div>
					<div class="text-2xl md:text-3xl font-extrabold">{followers || '0'}</div>
					<div class="text-xs">Total users.</div>
				</div>
				<Icon src={UserGroup} class="w-7 h-7 md:w-12 md:h-12 text-primary" solid />
			</div>

			<div class="w-full justify-between shadow rounded p-2 px-5 flex gap-5 items-center">
				<div class="flex flex-col">
					<div class="capitalize text-sm font-thin">Following</div>
					<div class="text-2xl md:text-3xl font-extrabold">{following || '0'}</div>
					<div class="text-xs">Total users.</div>
				</div>
				<Icon src={UserPlus} class="w-7 h-7 md:w-12 md:h-12 text-primary" solid />
			</div>
		</div>
	</div>
</div>
