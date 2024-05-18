import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
	const headersList = headers();
	if(headersList.get('key') !== process.env.SILLY_KEY) {
		return Response.error();
	}
	return new Response("This is a new API route");
}