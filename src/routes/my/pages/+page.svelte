<script>
	import { MyPageItem } from '$lib/components';
	export let data;
</script>

<div class="px-4 mt-10">
	<h2 class="text-6xl font-bold">My Pages</h2>
	<p class="mt-2">Pages that you've created.</p>
	<div class="w-full mt-4 flex flex-col items-center">
		{#if data.pages.length === 0}
			<p class="text-center text-3xl">☹️</p>
			<p class="text-center text-3xl">Looks like you don't have any pages.</p>
			<a href="/pages/new" class="btn btn-primary max-w-md mt-4">Add One</a>
		{:else}
			{#each data.pages as page}
				<MyPageItem {page} />
			{/each}
		{/if}
	</div>
</div>
