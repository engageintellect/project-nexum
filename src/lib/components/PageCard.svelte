<script>
	import { Icon, CheckCircle } from 'svelte-hero-icons';
	import { getImageURL } from '$lib/utils';
	import Badge from './Badge.svelte';
	export let page;
	export let user;
	export let isNew = false;
	export let isOld = false;
</script>

<div
	class="card border border-neutral border-opacity-25 bg-base-100 rounded group active:scale-[98%] hover:shadow-lg transition-all duration-50 h-full"
>
	{#if isNew}
		<Badge msg={'NEW!'} {isNew} />
	{/if}

	{#if isOld}
		<Badge msg={'OLD'} {isOld} />
	{/if}

	<a
		href="/pages/{page.id}"
		class="rounded focus:shadow-lg transition-all duration-200 h-full outline-none"
	>
		{#if user}
			<div class="flex gap-2 items-center p-2 md:p-4">
				<img
					class="w-8 h-8 rounded-full border border-primary group-hover:saturate-150 transition-color duration-300"
					src={user?.avatar
						? getImageURL(user?.collectionId, user?.id, user?.avatar)
						: `https://ui-avatars.com/api/?name=${user?.name}`}
					alt="User avatar"
				/>
				<div class="flex flex-col">
					<p class="text-md font-medium primary-content">{user.name}</p>
					<p class="text-xs font-thin secondary-content">{user.job_title}</p>
				</div>
			</div>
		{/if}
		<div class="relative overflow-hidden border-t border-b">
			<img
				class="h-52 w-full object-cover scale-[102%] group-hover:scale-105 group-hover:saturate-150 transition-all duration-500"
				src={page?.thumbnail
					? getImageURL(page.collectionId, page.id, page.thumbnail)
					: `https://via.placeholder.com/500/4506CB/FFFFFF/?text=${page.name}`}
				alt="page thumbnail"
			/>

			{#if page.verified}
				<div class="absolute left-2 bottom-2 flex items-center">
					<div class="flex gap-1 badge badge-small badge-success rounded-full py-3 shadow-lg">
						<Icon src={CheckCircle} class=" w-5 h-5" />
						<div class="uppercase text-xs font-semibold">verified</div>
					</div>
				</div>
			{/if}
		</div>
		<div class="card-body p-2 md:p-4">
			<div>
				<div class="text-lg md:text-xl font-semibold">{page.name}</div>

				<div class="font-thin">{page.tagline}</div>
			</div>

			{#if page.division != ''}
				<div class="badge badge-primary text-xs md:text-sm rounded py-3 mt-2">
					{page.division}
				</div>
			{/if}

			{#if page.expand.tags}
				<div class="flex flex-wrap items-end gap-2 mt-2">
					{#each page.expand.tags as tag}
						<div class="badge badge-outline">{tag.name}</div>
					{/each}
				</div>
			{/if}
		</div>
	</a>
</div>
