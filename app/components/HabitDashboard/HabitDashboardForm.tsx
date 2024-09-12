"use client"

import { HabitDashboardParameters } from '@/app/types'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function HabitDashboardForm({
	initialValues,
	update
} : {
	initialValues: HabitDashboardParameters;
	update: (data: HabitDashboardParameters) => void;
}) {

	const {register, handleSubmit} = useForm<HabitDashboardParameters>();

	return (
		<div>HabitDashboardForm</div>
	)
}