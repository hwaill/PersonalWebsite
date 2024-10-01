"use client"

import { HabitDashboardParameters } from '@/app/types'
import React from 'react'
import { useForm } from 'react-hook-form'

import style from '../../henry/habits/dashboard/habitsDashboard.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DASHBOARD_CUSTOM, DASHBOARD_VIEW_NAMES } from '@/app/constants/constants_habitDashboard'

export default function HabitDashboardForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	function updateSearchParams(data: HabitDashboardParameters) {
		const params = new URLSearchParams(searchParams);

		params.set("view", data.view.toString());
		params.set("startingDate", data.startingDate);
		params.set("endingDate", data.endingDate);
		console.log(data.view);
		router.push(`${pathname}?${params.toString()}`);
	}

	var initialView = searchParams.get('view') || "1";
	var initialStartingDate = searchParams.get('startingDate') || "2024-08-22";
	var initialEndingDate = searchParams.get('endingDate') || "2024-08-29";

	var initialValues: HabitDashboardParameters = {
		view: initialView,
		startingDate: initialStartingDate,
		endingDate: initialEndingDate
	};

	const {register, handleSubmit, watch} = useForm<HabitDashboardParameters>(
		{defaultValues:initialValues}
	);

	function onSubmit(data: HabitDashboardParameters) {
		updateSearchParams(data);
	}

	const currentView = watch('view');
	const currentStartingDate = watch('startingDate');
	const currentEndingDate = watch('endingDate');

	return (
		<>
			<h4>Habit Dashboard</h4>
			<form className={style.dashboardConfigForm} onSubmit={handleSubmit(onSubmit)}>
				<div className={style.dashboardConfigViewSelect}>
					<span className={style.dashboardConfigLabel}>View</span>
					{ DASHBOARD_VIEW_NAMES.map((key, index) => {
						return (
							<label className={style.dashboardConfigViewLabel} key={key}>
								<input
									className={style.dashboardConfigInput}
									{...register("view")}
									type="radio"
									value={index.toString()}
								/>
								{ key }
							</label>
						)
					})}
				</div>
				<div className={style.dashboardConfigOptionSelect}>
					<span className={style.dashboardConfigLabel}>Options</span>
					{ currentView == DASHBOARD_CUSTOM && 
						<label>
							<span className={style.dashboardConfigDateLabel}>Starting Date Select</span>
							<input
								className={style.dashboardConfigDate + " neu"}
								{...register("startingDate")}
								type="date"
							/>
						</label>
					}
					<label>
						<span className={style.dashboardConfigDateLabel}>{ currentView == DASHBOARD_CUSTOM && <>Ending </>}Date Select</span>
						<input
							className={style.dashboardConfigDate + " neu"}
							{...register("endingDate")}
							type="date"
							min={ currentView == DASHBOARD_CUSTOM ? currentStartingDate : undefined }
						/>
					</label>
				</div>
				<div className={style.dashboardConfigButtonContainer}>
					<button className={style.dashboardConfigSubmit + " buttonSmall"}>Update</button>
				</div>
				<div className={style.dashboardConfigClearFix}></div>
			</form>
		</>
	)
}