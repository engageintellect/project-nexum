export const actions = {
	likePage: async ({ request, locals }) => {
		const form = await request.formData();
		const { id, like } = Object.fromEntries(form.entries());
		const likedPages = locals.user.likes;

		if (like === 'true') {
			const index = likedPages.indexOf(id);
			likedPages.splice(index, 1);
		} else {
			likedPages.push(id);
		}

		await locals.pb.collection('users').update(locals.user.id, {
			likes: likedPages
		});
	},

	favoritePage: async ({ request, locals }) => {
		const form = await request.formData();
		const { id, favorite } = Object.fromEntries(form.entries());
		const favoritePages = locals.user.likes;

		if (favorite === 'true') {
			const index = favoritePages.indexOf(id);
			favoritePages.splice(index, 1);
		} else {
			favoritePages.push(id);
		}

		await locals.pb.collection('users').update(locals.user.id, {
			favorites: favoritePages
		});
	},

	followUser: async ({ request, locals }) => {
		const form = await request.formData();
		const { id, follow } = Object.fromEntries(form.entries());
		const following = locals.user.following;

		if (follow === 'true') {
			const index = following.indexOf(id);
			following.splice(index, 1);
		} else {
			following.push(id);
		}

		await locals.pb.collection('users').update(locals.user.id, {
			following: following
		});
	}
};
