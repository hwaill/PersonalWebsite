"use client"

import { HABIT_DASHBOARD_VIEWS, HabitDashboardParameters } from '@/app/types'
import React from 'react'
import HabitDashboardForm from './HabitDashboardForm'

function updateDashboard(data: HabitDashboardParameters) {

}

export default function HabitDashboard() {
	var initialValues: HabitDashboardParameters = {
		view: HABIT_DASHBOARD_VIEWS.WEEK_VIEW
	}
	// const days = await prisma.habitDay.findMany({
	// 	where: {
	// 		date: {
	// 			gte: "2024_06_07",
	// 			lte: "2024_06_14"
	// 		}
	// 	}
	// });

	// console.log(days);
	
	return (
		<>
			<div>HabitDashboard</div>
			<HabitDashboardForm initialValues={initialValues} update={updateDashboard}/>
		</>
	)
}