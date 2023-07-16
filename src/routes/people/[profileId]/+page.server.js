import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = ({ locals, params }) => {
	const getPageUser = async (profileId) => {
		try {
			const pageUser = serializeNonPOJOs(await locals.pb.collection('users').getOne(profileId, {}));
			return pageUser;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	const getUsers = async () => {
		try {
			const users = serializeNonPOJOs(await locals.pb.collection('users').getFullList(undefined), {
				expand: ['favorites', 'likes', 'tags', 'following']
			});
			return users;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	const getPages = async () => {
		try {
			const pages = serializeNonPOJOs(
				await locals.pb.collection('pages').getFullList({
					sort: '-updated',
					expand: ['tags', 'favorites', 'likes']
				})
			);
			return pages;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	const getTags = async () => {
		try {
			const tags = serializeNonPOJOs(await locals.pb.collection('tags').getFullList(undefined), {
				expand: ['favorites', 'likes']
			});
			return tags;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	return {
		pageUser: getPageUser(params.profileId),
		users: getUsers(),
		pages: getPages(),
		tags: getTags()
	};
};

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
