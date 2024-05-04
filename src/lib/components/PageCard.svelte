<script>
	import { Icon, CheckCircle } from 'svelte-hero-icons';
	import { getImageURL } from '$lib/utils';
	import PageCardBadge from '$lib/components/PageCardBadge.svelte';
	export let page;
	export let user;
	export let isNew = false;
	export let isOld = false;
	export let showUser = true;
</script>

<div
	class="card border border-neutral/10 bg-base-100 rounded group active:scale-[99%] hover:shadow-md transition-all h-full"
>
	{#if isNew}
		<PageCardBadge msg={'NEW!'} {isNew} />
	{/if}

	{#if isOld}
		<PageCardBadge msg={'STALE'} {isOld} />
	{/if}

	<a
		href="/pages/{page.id}"
		class="rounded focus:shadow-lg transition-all duration-200 h-full outline-none"
	>
		{#if user && showUser}
			<div class="flex gap-2 items-center p-2">
				<img
					class="w-8 h-8 object-cover rounded-full border border-primary group-hover:saturate-150 transition-color duration-300"
					src={user?.avatar
						? getImageURL(user?.collectionId, user?.id, user?.avatar)
						: `https://ui-avatars.com/api/?name=${user?.name}`}
					alt="User avatar"
				/>
				<div class="flex flex-col">
					<div class="text-sm font-medium primary-content">{user.name}</div>
					<div class="text-xs font-thin secondary-content">{user.job_title}</div>
				</div>
			</div>
		{/if}
		<div class="relative overflow-hidden border-neutral/10 border-t border-b">
			<img
				class="h-52 w-full object-cover scale-[100%] group-hover:scale-105 group-hover:saturate-150 transition-all duration-500"
				src={page?.thumbnail
					? getImageURL(page.collectionId, page.id, page.thumbnail)
					: `https://via.placeholder.com/500/6d28d9/FFFFFF/?text=${page.name}`}
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
		<div class="card-body p-2">
			<div>
				<div class="text-lg font-bold">{page.name}</div>

				<div class="font-thin">{page.tagline}</div>
			</div>

			{#if page.division != ''}
				<div class="badge badge-primary text-xs md:text-sm rounded py-3 mt-2">
					{page.division}
				</div>
			{/if}

			{#if page.expand.tags}
				<div class="flex flex-wrap items-end gap-2">
					{#each page.expand.tags as tag}
						<div class="badge badge-xs badge-outline py-3">{tag.name}</div>
					{/each}
				</div>
			{/if}
		</div>
	</a>
</div>
