import { convertDateToPrismaID, convertPrismaIDToString } from "../HabitDashboardHelperFunctions";

import style from '../../../henry/habits/dashboard/habitsDashboard.module.css'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function HabitDashboardViewMonth({
	view,
	startingDate,
	endingDate
} : {
	view: string,
	startingDate: string,
	endingDate: string
}) {
	const day = await prisma.habitDay.findFirst({
		where: {
			date: convertDateToPrismaID(endingDate),
		},
		include: {
			habits: {
				where: {
					AND: [{
						NOT: {
							typeId: {
								equals: 307
							}
						}
					},{
						NOT: {
							typeId: {
								equals: 308
							}
						}
					}]
				},
				select: {
					complete: true,
					typeId: true,
					habitType: {
						select: {
							name: true,
						}
					}
				},
				orderBy: {
					typeId: "asc",
				}
			},
			reports: {
				select: {
					type: true,
					value: true,
				}
			},
		}
	});

	return (
		<>
		</>
	)
}