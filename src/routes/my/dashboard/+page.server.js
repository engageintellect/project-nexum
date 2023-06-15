import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getProjects = async () => {
		try {
			const projects = serializeNonPOJOs(
				await locals.pb.collection('projects').getFullList(
					// sort: '-updated',
					// expand: 'tags',
					// filter: `user = "${locals.user.id}"`
				)
			);
			return projects;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}

	

	const getUserFavorites = async () => {
		try {
			const favorites = serializeNonPOJOs(
				await locals.pb.collection('users').getFullList(
					// sort: '-updated',
					// expand: 'favorites',
					// filter: `user = "${userId}"`

				)
			);
			return favorites;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		favorites: getUserFavorites(locals.user.id),
		projects: getProjects(),
	};
};

export const actions = {
	deleteProject: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('projects').delete(id);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};

