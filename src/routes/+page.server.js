import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/about');
	}

	const getPages = async () => {
		try {
			const pages = serializeNonPOJOs(
				await locals.pb.collection('pages').getFullList({
					sort: '-updated',
					expand: 'tags'
				})
			);
			return pages;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	const getUsers = async () => {
		try {
			const users = serializeNonPOJOs(await locals.pb.collection('users').getFullList(undefined));
			return users;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	const getTags = async () => {
		try {
			const tags = serializeNonPOJOs(await locals.pb.collection('tags').getFullList(undefined));
			return tags;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	return {
		pages: getPages(),
		users: getUsers(),
		tags: getTags()
	};
};
