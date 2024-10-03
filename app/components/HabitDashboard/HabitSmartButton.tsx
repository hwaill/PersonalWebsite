'use client'

import { HabitDashboardParameters } from '@/app/types';
import Link from 'next/link';
import React from 'react'

export default function HabitSmartButton() {
	const currentDate = new Date();
	const weekAgoDate = new Date();
	weekAgoDate.setDate(currentDate.getDate() - 7);
	var currentDateString = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "-" + currentDate.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
	var weekAgoDateString = weekAgoDate.getFullYear() + "-" + (weekAgoDate.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "-" + weekAgoDate.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})

	var dashboardParams: HabitDashboardParameters = {
		view: "0",
		startingDate: weekAgoDateString,
		endingDate: currentDateString
	}

	return (
		<Link className="button" href={`/henry/habits/dashboard?view=${dashboardParams.view}&startingDate=${dashboardParams.startingDate}&endingDate=${dashboardParams.endingDate}`}>Hold me accountable<div className="buttonIcon" style={{ WebkitMaskImage: 'url(/img/flaticon/arrow-right.svg)', maskImage: 'url(/img/flaticon/arrow-right.svg)' }}></div></Link>
	)
}

	