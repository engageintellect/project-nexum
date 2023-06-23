import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export async function GET() {
	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	// you can also fetch all records at once via getFullList
	const records = await pb.collection('pages').getFullList(200 /* batch size */, {
		sort: '-created'
	});

	return new Response(JSON.stringify(records), {
		headers: {
			'content-type': 'application/json'
		}
	});
}
