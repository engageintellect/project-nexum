<script>
	import { MyPageItem } from '$lib/components';
	export let data;
</script>

<div class="px-4 mt-10">
	<div class="text-6xl font-bold">My Pages</div>
	<div class="mt-2">Pages that you've created.</div>
	<div class="w-full mt-4 flex flex-col items-center">
		{#if data.pages.length === 0}
			<div class="text-center text-3xl">☹️</div>
			<div class="text-center text-3xl">Looks like you don't have any pages.</div>
			<a href="/pages/new" class="btn btn-primary max-w-md mt-4">Add One</a>
		{:else}
			{#each data.pages as page}
				<MyPageItem {page} />
			{/each}
		{/if}
	</div>
</div>
