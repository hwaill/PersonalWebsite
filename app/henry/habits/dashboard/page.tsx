import { Metadata } from 'next'
import React from 'react'

import style from "./habitsDashboard.module.css"

import prisma from '@/lib/prisma'
import Image from 'next/image'
import HabitDashboard from '@/app/components/HabitDashboard/HabitDashboard'

export const metadata : Metadata = {
	title: "Habits Dashboard",
}

export default async function Habits({
	searchParams
} : {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	return (
		<div className="pageTopMargin">
			<div className={style.dashboardLayout}>
				<div className={style.dashboardContent}><HabitDashboard searchParams={searchParams}/></div>
			</div>
		</div>
	)
}