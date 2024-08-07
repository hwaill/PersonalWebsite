import { Metadata } from 'next'
import React from 'react'

import style from "./habitsDashboard.module.css"

import prisma from '@/lib/prisma'
import Image from 'next/image'

export const metadata : Metadata = {
	title: "Habits Dashboard",
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
		<div className="pageTopMargin">
			<div className="sectionContent">
				<h2 className="blueText">Habits</h2>
			</div>
		</div>
	)
}