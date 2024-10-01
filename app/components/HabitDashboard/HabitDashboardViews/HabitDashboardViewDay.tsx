import { convertDateToPrismaID, convertDateToString, convertPrismaIDToString } from "../HabitDashboardHelperFunctions";

import style from '../../../henry/habits/dashboard/habitsDashboard.module.css'

import React from "react";
import { PrismaClient, ReportType } from "@prisma/client";

const prisma = new PrismaClient();

export default async function HabitDashboardViewDay({
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
		<div className={style.dayContainer + " neu"}>
			{day && 
				<>
					<h3>{convertPrismaIDToString(day.date)}</h3>
					<div className={style.dayCategoryContainer}>
						<div className={style.dayCategory}>
							<h5>Morning Habits</h5>
							<DayHabitsInIdRange habits={day.habits} minId={100} maxId={199} />
						</div>
						<div className={style.dayCategory}>
							<h5>Daily Goals</h5>
							<DayHabitsInIdRange habits={day.habits} minId={300} maxId={399} />
						</div>
						<div className={style.dayCategory}>
							<h5>Evening Habits</h5>
							<DayHabitsInIdRange habits={day.habits} minId={200} maxId={299} />
						</div>
					</div>
					<div className={style.dayOtherContainer}>
						<h4>Other Goals</h4>
						<DayOtherActivities habits={day.habits} minId={400} maxId={499} />
					</div>
					<div className={style.dayOtherContainer}>
						<h4>Productive Downtime</h4>
						<DayOtherActivities habits={day.habits} minId={500} maxId={599} />
					</div>
					<div className={style.dayReportsContainer}>
						<h4>Daily Reports</h4>
						<DayReports reports={day.reports} />
					</div>
				</>
			}
			{!day && 
				<>
					<h3>{convertDateToString(endingDate)}</h3>
					<h4 className={style.noData}>There is no data for this day.</h4>
				</>
			}
		</div>
	)
}

function DayHabitsInIdRange({
	habits,
	minId,
	maxId
} : {
	habits: {
    complete: boolean;
    typeId: number;
    habitType: {
        name: string;
    };
	}[],
	minId: number,
	maxId: number
}) {
	let habitCount = 0;
	habits.map((value, index) => {
		if(value.typeId <= maxId && value.typeId >= minId) habitCount++;
	})

	if(habitCount == 0) {
		return (
			<div className={style.noHabits}>No data recorded.</div>
		)
	}

	return (
		<>
			{habits.map((value, index) => {
				return (
					<>
						{value.typeId <= maxId && value.typeId >= minId && 
							<div className={style.dayHabit}>
								<div {...(value.complete == true ? {className : style.dayHabitChecked} : {className : style.dayHabitUnchecked})}></div>
								<div className={style.dayHabitLabel}>{value.habitType.name}</div>
							</div>
						}
					</>
				)
			})}
		</>
	)
}

function DayOtherActivities({
	habits,
	minId,
	maxId
} : {
	habits: {
    complete: boolean;
    typeId: number;
    habitType: {
        name: string;
    };
	}[],
	minId: number,
	maxId: number
}) {
	let habitCount = 0;
	habits.map((value, index) => {
		if(value.typeId <= maxId && value.typeId >= minId) habitCount++;
	})

	if(habitCount == 0) {
		return (
			<div className={style.noHabits}>Nothing to report here.</div>
		)
	}

	return (
		<>
			{habits.map((value, index) => {
				return (
					<>
						{value.typeId <= maxId && value.typeId >= minId && 
							<div className={style.dayOtherGoal}>
								<div className={style.dayOtherGoalLabel}>{value.habitType.name}</div>
							</div>
						}
					</>
				)
			})}
		</>
	)
}

const REPORT_TYPES : string[] = [
	"Morning Mood",
	"Sleep",
	"Productivity",
	"Energy",
	"Evening Mood"
];

function DayReports({
	reports
} : {
	reports: {
    type: ReportType;
    value: number;
	}[]
}) {
	var reportStatus : number[] = [-1, -1, -1, -1, -1];
	reports.map((value, index) => {
		if(value.type == ReportType.MORNING_MOOD) {
			reportStatus[0] = index;
		} else if(value.type == ReportType.SLEEP_REPORT) {
			reportStatus[1] = index;
		} else if(value.type == ReportType.PRODUCTIVITY_REPORT) {
			reportStatus[2] = index;
		} else if(value.type == ReportType.ENERGY_REPORT) {
			reportStatus[3] = index;
		} else if(value.type == ReportType.EVENING_MOOD) {
			reportStatus[4] = index;
		}
	})

	return (
		<>
			{reportStatus.map((value, index) => {
				if(value == -1) {
					return <DayReportItem key={index} label={REPORT_TYPES[index]} value={value} />
				} else {
					return <DayReportItem key={index} label={REPORT_TYPES[index]} value={reports[reportStatus[index]].value} />
				}
			})}
		</>
	)
}

function DayReportItem({
	label,
	value
} : {
	label: string,
	value: number
}) {
	if(value == -1) {
		return (
			<div className={style.dayReportContainer}>
				<div className={style.dayReportLabel + " " + style.dayReportNone}>{label}</div>
				<div className={style.dayReportCircles + " " + style.dayReportNone}>
					<div className={style.dayReportCircleEmpty}></div>
					<div className={style.dayReportCircleEmpty}></div>
					<div className={style.dayReportCircleEmpty}></div>
					<div className={style.dayReportCircleEmpty}></div>
					<div className={style.dayReportCircleEmpty}></div>
				</div>
			</div>
		)
	} else {
		return (
			<div className={style.dayReportContainer}>
				<div className={style.dayReportLabel}>{label}</div>
				<div className={style.dayReportCircles}>
					<div {...(value >= 0 ? {className : style.dayReportCircleFull} : {className : style.dayReportCircleEmpty})}></div>
					<div {...(value >= 1 ? {className : style.dayReportCircleFull} : {className : style.dayReportCircleEmpty})}></div>
					<div {...(value >= 2 ? {className : style.dayReportCircleFull} : {className : style.dayReportCircleEmpty})}></div>
					<div {...(value >= 3 ? {className : style.dayReportCircleFull} : {className : style.dayReportCircleEmpty})}></div>
					<div {...(value >= 4 ? {className : style.dayReportCircleFull} : {className : style.dayReportCircleEmpty})}></div>
				</div>
			</div>
		)
	}
}