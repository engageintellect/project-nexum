import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals }) => {
	if (locals.user) {
		const getUsers = async () => {
			try {
				const users = serializeNonPOJOs(
					await locals.pb.collection('users').getFullList(undefined),
					{
						sort: '-updated',
						expand: ['favorites', 'likes', 'tags', 'following', 'badges']
					}
				);
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
						expand: ['tags, likes']
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
				const tags = serializeNonPOJOs(await locals.pb.collection('tags').getFullList(undefined));
				return tags;
			} catch (err) {
				console.log('Error:', err);
				throw error(err.status, err.message);
			}
		};

		const getBadges = async () => {
			try {
				const badges = serializeNonPOJOs(
					await locals.pb.collection('badges').getFullList({
						sort: '-updated'
						// expand: 'tags',
						// filter: `user = "${locals.user.id}"`
					})
				);
				return badges;
			} catch (err) {
				console.log('Error: ', err);
				throw error(err.status, err.message);
			}
		};

		return {
			user: locals.user,
			users: getUsers(),
			pages: getPages(),
			tags: getTags(),
			badges: getBadges()
		};
	}

	return {
		user: undefined
	};
};
