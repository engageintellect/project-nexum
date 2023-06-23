import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = ({ locals, params }) => {
	const getUser = async (profileId) => {
		try {
			const user = serializeNonPOJOs(
				await locals.pb.collection('users').getOne(profileId, {})
			);
			return user;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	const getUsers = async () => {
		try {
			const users = serializeNonPOJOs(await locals.pb.collection('users').getFullList(undefined), {
				expand: ['favorites', 'likes']
			});
			return users;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};


	return {
		user: getUser(params.profileId),
		users: getUsers(),
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
      likes: likedPages,
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
      favorites: favoritePages,
    });
  },

};



