<script>
	import { enhance } from '$app/forms';
	import PageCard from '$lib/components/PageCard.svelte';
	import { getImageURL } from '$lib/utils';
	import { Icon, Heart, HandThumbUp, Share, PencilSquare } from 'svelte-hero-icons';
	import readtime from 'read-time';
	import ToolTipButton from '../../../lib/components/ToolTipButton.svelte';
	export let data;
	let user = data.user;

	import Toc from 'svelte-toc';

	// const readTime = readtime(data.page.content);

	// const getTotalLikes = (users, pages) => {
	// 	const total = users.reduce((count, user) => {
	// 		if (user.likes.includes(pages.id)) {
	// 			return count + 1;
	// 		}
	// 		return count;
	// 	}, 0);

	// 	return total;
	// };

	// const getTotalFavorites = (users, pages) => {
	// 	const total = users.reduce((count, user) => {
	// 		if (user.favorites.includes(pages.id)) {
	// 			return count + 1;
	// 		}
	// 		return count;
	// 	}, 0);

	// 	return total;
	// };
</script>

<div class="my-10">
	<!-- USER DATA -->
	<div class="max-w-3xl mx-auto px-4 my-10 md:my-20">
		<div class="flex flex-col md:flex-row gap-4 md:items-center justify-center">
			<div>
				<img
					class="w-24 md:w-32 rounded-full border border-primary group-hover:saturate-150 transition-color duration-300"
					src={data.user?.avatar
						? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
						: `https://ui-avatars.com/api/?name=${data.user?.name}`}
					alt="User avatar"
				/>
			</div>
			<div>
				<div class="text-2xl md:text-3xl font-semibold">
					{data.user.name}
				</div>
				<div class="text-lg md:text-xl font-thin">{data.user.job_title}</div>
				<div class="badge md:badge-lg badge-primary rounded mt-2 uppercase py-3">
					{data.user.division}
				</div>
			</div>
		</div>
	</div>

	<!-- USER PAGES -->
	<div class="flex justify-center pt-4">
		<div class="flex flex-col w-full px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each data.pages as page}
				<!-- {#each data.users as user} -->
				{#if page.user === data.user.id}
					<PageCard {page} />
				{/if}
			{/each}
		</div>
	</div>
</div>
