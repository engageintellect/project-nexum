<script>
	import { enhance } from '$app/forms';
	import { getImageURL } from '$lib/utils';
	import { Icon, Heart, HandThumbUp, Share, PencilSquare } from 'svelte-hero-icons';
	import readtime from 'read-time';
	import ToolTipButton from '../../../lib/components/ToolTipButton.svelte';
	export let data;
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

<div>
	<!-- USER DATA -->

	<div>{JSON.stringify(data.user)}</div>
</div>
