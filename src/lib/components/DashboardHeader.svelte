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
</script>

<div class=" mx-4 my-10">
	<div class="flex flex-col md:items-center md:flex-row gap-2">
		<img
			src={avatar}
			alt="pic"
			class="object-cover h-24 w-24 sm:h-32 sm:w-32 md:h-52 md:w-52 rounded-full border shadow"
		/>
		<div class="w-full flex-col">
			<div class="font-bold text-lg">{name || 'stranger'}</div>
			<div class="font-thin">{title || 'title'}</div>
			<div class="badge badge-sm badge-primary uppercase py-3 rounded">
				{division || 'division'}
			</div>
		</div>

		<div class="w-full flex flex-col gap-2 p-2">
			<div class="w-full shadow rounded p-2 flex gap-2 items-center">
				<Icon src={PencilSquare} class="w-12 h-12 text-primary" solid />
				<div class="flex flex-col">
					<div class="capitalize text-sm font-thin">Pages</div>
					<div class="text-2xl md:text-3xl font-bold">{pageCount || '0'}</div>
					<div class="text-xs">Total pages created.</div>
				</div>
			</div>

			<div class="w-full shadow rounded p-2 flex gap-2 items-center">
				<Icon src={UserGroup} class="w-12 h-12 text-info" solid />
				<div class="flex flex-col">
					<div class="capitalize text-sm font-thin">Followers</div>
					<div class="text-2xl md:text-3xl font-bold">{followers || '0'}</div>
					<div class="text-xs">Total users.</div>
				</div>
			</div>

			<div class="w-full shadow rounded p-2 flex gap-2 items-center">
				<Icon src={UserPlus} class="w-12 h-12 text-success" solid />
				<div class="flex flex-col">
					<div class="capitalize text-sm font-thin">Following</div>
					<div class="text-2xl md:text-3xl font-bold">{following || '0'}</div>
					<div class="text-xs">Total users.</div>
				</div>
			</div>
		</div>
	</div>
</div>
