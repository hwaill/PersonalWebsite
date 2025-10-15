import { convertDateToPrismaID, convertPrismaIDToString } from "../HabitDashboardHelperFunctions";

import style from '../../../(mainSite)/henry/habits/dashboard/habitsDashboard.module.css'

import React from "react";
import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma"

export default async function HabitDashboardViewCustom({
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