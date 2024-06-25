import { Metadata } from 'next'
import React from 'react'

import prisma from '@/lib/prisma'

export const metadata : Metadata = {
	title: "Habits",
}

export default async function Habits() {
	const days = await prisma.habitDay.findMany({
		where: {
			date: {
				gte: "2024_06_07",
				lte: "2024_06_14"
			}
		}
	});

	console.log(days);

	return (
		<div>Habits</div>
	)
}