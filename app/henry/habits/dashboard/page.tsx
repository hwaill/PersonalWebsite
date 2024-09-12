import { Metadata } from 'next'
import React from 'react'

import style from "./habitsDashboard.module.css"

import prisma from '@/lib/prisma'
import Image from 'next/image'
import HabitDashboard from '@/app/components/HabitDashboard/HabitDashboard'

export const metadata : Metadata = {
	title: "Habits Dashboard",
}

export default async function Habits() {
	return (
		<div className="pageTopMargin">
			<div className="sectionContent">
				<h2 className="blueText">Habit Dashboard</h2>
				<HabitDashboard />
			</div>
		</div>
	)
}