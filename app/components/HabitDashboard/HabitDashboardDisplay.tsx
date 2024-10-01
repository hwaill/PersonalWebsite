import { HabitDashboardParameters } from '@/app/types'
import React from 'react'

import style from '../../henry/habits/dashboard/habitsDashboard.module.css'
import { Prisma, PrismaClient } from '@prisma/client';
import { DASHBOARD_CUSTOM, DASHBOARD_DAY, DASHBOARD_MONTH, DASHBOARD_WEEK, DAY_NAMES, MONTH_NAMES } from '@/app/constants/constants_habitDashboard';
import HabitDashboardViewDay from './HabitDashboardViews/HabitDashboardViewDay';
import HabitDashboardViewWeek from './HabitDashboardViews/HabitDashboardViewWeek';
import HabitDashboardViewMonth from './HabitDashboardViews/HabitDashboardViewMonth';
import HabitDashboardViewCustom from './HabitDashboardViews/HabitDashboardViewCustom';

export const prisma = new PrismaClient();

export default async function HabitDashboardDisplay({
	searchParams
} : {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	const viewSearch = searchParams?.view ?? "";
	const view = Array.isArray(viewSearch) ? viewSearch[0] : viewSearch;

	const startingDateSearch = searchParams?.startingingDate ?? "";
	const startingDate = Array.isArray(startingDateSearch) ? startingDateSearch[0] : startingDateSearch;

	const endingDateSearch = searchParams?.endingDate ?? "";
	const endingDate = Array.isArray(endingDateSearch) ? endingDateSearch[0] : endingDateSearch;

	return (
		<div className={style.dashboardDisplay}>
			{view == DASHBOARD_DAY && <HabitDashboardViewDay view={view} startingDate={startingDate} endingDate={endingDate}/>}
			{view == DASHBOARD_WEEK && <HabitDashboardViewWeek view={view} startingDate={startingDate} endingDate={endingDate}/>}
			{view == DASHBOARD_MONTH && <HabitDashboardViewMonth view={view} startingDate={startingDate} endingDate={endingDate}/>}
			{view == DASHBOARD_CUSTOM && <HabitDashboardViewCustom view={view} startingDate={startingDate} endingDate={endingDate}/>}
		</div>
	)
}