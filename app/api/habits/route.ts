import { headers } from "next/headers";

export async function GET(Request) {
	const headersList = headers();
	if(headersList.get('key') !== process.env.SILLY_KEY) {
		return null;
	}
	return new Response("This is a new API route");
}