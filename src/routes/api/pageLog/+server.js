import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { error, json } from '@sveltejs/kit';

const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export async function POST({ request }) {
	try {
		const { user, page, username, pagename } = await request.json();

		await pb.collection('page_logs').create({ user, page, username, pagename });

		return json({ message: 'Data logged successfully!' });
	} catch (err) {
		console.error('Error logging data:', error);
		console.log(err.status, err.message);

		throw error(500, JSON.stringify({ message: 'An error occurred on the server.' }));
	}
}
