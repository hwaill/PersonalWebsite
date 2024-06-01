import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(Request: NextRequest) {
	const headersList = headers();
	if(headersList.get('key') !== process.env.SECRET_KEY) {
		return new Response(null, {
			status: 401
		});
	}
	return new Response(Request.body);
}