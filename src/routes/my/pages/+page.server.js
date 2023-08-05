import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getUsersPages = async (userId) => {
		try {
			const userPages = serializeNonPOJOs(
				await locals.pb.collection('pages').getFullList(undefined, {
					sort: '-updated',
					filter: `user = "${userId}"`
				})
			);
			return userPages;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		userPages: getUsersPages(locals.user.id)
	};
};
