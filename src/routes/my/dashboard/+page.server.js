import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getUsers = async () => {
		try {
			const users = serializeNonPOJOs(
				await locals.pb.collection('users').getFullList({
					sort: '-updated',
					expand: 'following'
					// filter: `user = "${locals.user.id}"`
				})
			);
			return users;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	const getPages = async () => {
		try {
			const pages = serializeNonPOJOs(
				await locals.pb.collection('pages').getFullList({
					sort: '-updated'
					// expand: 'tags',
					// filter: `user = "${locals.user.id}"`
				})
			);
			return pages;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		pages: getPages(),
		users: getUsers()
	};
};

export const actions = {
	deletePage: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('pages').delete(id);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};
