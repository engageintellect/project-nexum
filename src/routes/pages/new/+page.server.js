/* eslint-disable no-unused-vars */
import { error, fail, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { createPageSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();

		const thumb = body.get('thumbnail');

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}
		body.append('user', locals.user.id);

		const { formData, errors } = await validateData(body, createPageSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('pages').create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		console.log('FORM DATA: ', formData);
		throw redirect(303, '/');
	}
};
