import { DAY_NAMES, MONTH_NAMES } from "@/app/constants/constants_habitDashboard";

//Takes date in format "YYYY-MM-DD" and returns in format "YYYY_MM_DD"
export function convertDateToPrismaID(date: string) {
	var dateToReturn = date.substring(0, 4) + "_" + date.substring(5, 7) + "_" + date.substring(8);
	return dateToReturn;
}

//Takes date in format "YYYY_MM_DD" and returns in format "YYYY-MM-DD"
export function convertPrismaIDToDate(date: string) {
	var dateToReturn = date.substring(0, 4) + "-" + date.substring(5, 7) + "-" + date.substring(8);
	return dateToReturn;
}

export function convertDateToString(date: string) {
	const dateObject = new Date(date);
	var toReturn : string = DAY_NAMES[dateObject.getUTCDay()] + ", " + MONTH_NAMES[dateObject.getUTCMonth()] + " " + dateObject.getUTCDate() + ", " + dateObject.getUTCFullYear();
	return toReturn;
}

export function convertPrismaIDToString(date: string) {
	return convertDateToString(convertPrismaIDToDate(date));
}