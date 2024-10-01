import { HabitDashboardParameters } from '@/app/types'
import React from 'react'

import style from '../../henry/habits/dashboard/habitsDashboard.module.css'

import HabitDashboardDisplay from './HabitDashboardDisplay'
import HabitDashboardForm from './HabitDashboardForm'

export const dynamic = "force-dynamic";

export default function HabitDashboard({
	searchParams
} : {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	return (
		<>
			<div className={style.dashboardConfig + " neu"}>
				<HabitDashboardForm />
			</div>
			<HabitDashboardDisplay searchParams={searchParams}/>
		</>
	)
}