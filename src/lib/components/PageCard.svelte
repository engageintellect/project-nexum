<script>
	import { getImageURL } from '$lib/utils';
	import Badge from './Badge.svelte';
	export let page;
	export let user;
	export let isNew = false;
	export let isOld = false;
</script>

<div
	class="card border border-neutral bg-base-100 rounded group active:scale-[98%] shadow-md hover:shadow-lg transition-all duration-50"
>
	{#if isNew}
		<Badge msg={'NEW!'} {isNew} />
	{/if}

	{#if isOld}
		<Badge msg={'OLD'} {isOld} />
	{/if}

	<a href="/pages/{page.id}" class="rounded">
		<div class="flex gap-2 items-center p-4">
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
		<div class="relative overflow-hidden">
			<img
				class="h-52 w-full object-cover group-hover:scale-105 group-hover:saturate-150 transition-all duration-500 border"
				src={page?.thumbnail
					? getImageURL(page.collectionId, page.id, page.thumbnail)
					: `https://via.placeholder.com/500/4506CB/FFFFFF/?text=${page.name}`}
				alt="page thumbnail"
			/>
		</div>
		<div class="card-body p-4">
			{#if page.division}
				<div class="badge badge-primary rounded py-3 gap-2">
					{page.division}
				</div>
			{/if}

			<div>
				<h2 class="card-title">{page.name}</h2>

				<p>{page.tagline}</p>
			</div>

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
