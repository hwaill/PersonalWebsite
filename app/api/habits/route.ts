import { headers } from "next/headers";
import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { request } from "http";

export async function POST(Request: NextRequest) {
	const headersList = headers();
	const requestBody = await Request.json();
	
	if(headersList.get('key') !== process.env.SECRET_KEY) {
		return new Response(null, {
			status: 401
		});
	}

	var habitDay = await prisma.habitDay.findUnique({
		where: {
			date: requestBody.date,
		},
	});

	if(habitDay == null) {
		habitDay = await prisma.habitDay.create({
			data: {
				date: requestBody.date,
			},
		});
	}

	if(requestBody.updateType == "REPORT") {
		await prisma.report.upsert({
			where: {
				id: requestBody.date + "_" + requestBody.reportType,
			},
			update: {
				value: requestBody.value,
			},
			create: {
				id: requestBody.date + "_" + requestBody.reportType,
				type: requestBody.reportType,
				date: requestBody.date,
				value: requestBody.value,
			}
		});
	} else {
		for(let i = 0; i < requestBody.habits.length; i++) {
			if(requestBody.updateType == "OTHER" && !requestBody.checked) continue;
			await prisma.habitOccurence.upsert({
				where: {
					id: requestBody.date + "_" + requestBody.habits[i].id,
				},
				update: {
					complete: requestBody.habits[i].checked,
				},
				create: {
					id: requestBody.date + "_" + requestBody.habits[i].id,
					date: requestBody.date,
					typeId: requestBody.habits[i].id,
					complete: requestBody.habits[i].checked,
				}
			});
		}
	}

	// const createMany = await prisma.habitType.createMany({
	// 	data: [
	// 		{ id: 100, name: 'Make the bed', category: "MORNING_ROUTINE" },
	// 		{ id: 101, name: 'Stretch', category: "MORNING_ROUTINE" },
	// 		{ id: 102, name: 'Early dog walk', category: "MORNING_ROUTINE" },
	// 		{ id: 103, name: 'Take meds', category: "MORNING_ROUTINE" },
	// 		{ id: 104, name: 'Drink lemon water', category: "MORNING_ROUTINE" },
	// 		{ id: 105, name: 'Take cold shower', category: "MORNING_ROUTINE" },
	// 		{ id: 106, name: 'Skin care', category: "MORNING_ROUTINE" },
	// 		{ id: 107, name: 'Teeth!', category: "MORNING_ROUTINE" },
	// 		{ id: 108, name: 'Say affirmations', category: "MORNING_ROUTINE" },
	// 		{ id: 109, name: 'Make coffee', category: "MORNING_ROUTINE" },
	// 		{ id: 110, name: 'Solid breakfast', category: "MORNING_ROUTINE" },
	// 		{ id: 111, name: 'Check planner', category: "MORNING_ROUTINE" },
	// 		{ id: 200, name: 'Check texts', category: "EVENING_ROUTINE" },
	// 		{ id: 201, name: 'Check email', category: "EVENING_ROUTINE" },
	// 		{ id: 202, name: 'Late dog walk', category: "EVENING_ROUTINE" },
	// 		{ id: 203, name: 'Update planner', category: "EVENING_ROUTINE" },
	// 		{ id: 204, name: 'Tech off early', category: "EVENING_ROUTINE" },
	// 		{ id: 205, name: 'Journal', category: "EVENING_ROUTINE" },
	// 		{ id: 206, name: 'Shower', category: "EVENING_ROUTINE" },
	// 		{ id: 207, name: 'Skincare', category: "EVENING_ROUTINE" },
	// 		{ id: 208, name: 'Make tea', category: "EVENING_ROUTINE" },
	// 		{ id: 209, name: 'Read', category: "EVENING_ROUTINE" },
	// 		{ id: 210, name: 'Teeth!', category: "EVENING_ROUTINE" },
	// 		{ id: 300, name: 'Tidy', category: "DAILY_GOALS" },
	// 		{ id: 301, name: 'Intentional mindfulness', category: "DAILY_GOALS" },
	// 		{ id: 302, name: 'Contact a friend', category: "DAILY_GOALS" },
	// 		{ id: 303, name: 'Contact family', category: "DAILY_GOALS" },
	// 		{ id: 304, name: 'Work out', category: "DAILY_GOALS" },
	// 		{ id: 305, name: 'Long dog walk', category: "DAILY_GOALS" },
	// 		{ id: 306, name: 'Drink water', category: "DAILY_GOALS" },
	// 		{ id: 307, name: 'Avoid alcohol', category: "DAILY_GOALS" },
	// 		{ id: 308, name: 'Avoid substances', category: "DAILY_GOALS" },
	// 		{ id: 400, name: 'Laundry', category: "OTHER_GOALS" },
	// 		{ id: 401, name: 'Deep clean', category: "OTHER_GOALS" },
	// 		{ id: 402, name: 'Groceries', category: "OTHER_GOALS" },
	// 		{ id: 403, name: 'Water plants', category: "OTHER_GOALS" },
	// 		{ id: 404, name: 'Clean the car', category: "OTHER_GOALS" },
	// 		{ id: 405, name: 'Take out the trash', category: "OTHER_GOALS" },
	// 		{ id: 500, name: 'Learn something new', category: "PRODUCTIVE_DOWNTIME" },
	// 		{ id: 501, name: 'Do something creative', category: "PRODUCTIVE_DOWNTIME" },
	// 		{ id: 502, name: 'Organize something', category: "PRODUCTIVE_DOWNTIME" },
	// 		{ id: 503, name: 'Plan an activity', category: "PRODUCTIVE_DOWNTIME" },
	// 		{ id: 504, name: 'Work on a personal project', category: "PRODUCTIVE_DOWNTIME" },
	// 	],
	// 	skipDuplicates: true,
	// })

	return new Response("Update successful!");
}