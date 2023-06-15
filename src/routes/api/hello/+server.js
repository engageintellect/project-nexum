export function GET() {
	const msg = 'hello world';

	return new Response(JSON.stringify(msg), {
		headers: {
			'content-type': 'application/json'
	}})


}