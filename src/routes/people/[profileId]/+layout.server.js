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

	return {
		pageUser: getPageUser(params.profileId)
	};
};
