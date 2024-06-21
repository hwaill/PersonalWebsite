import React from 'react'

import style from './projectTeam.module.css'

import { TeamCardData } from '@/app/types'
import ProjectTeamCard from './ProjectTeamCard'

export default function ProjectTeam({
	data
} : {
	data: TeamCardData[]
}) {
	return (
		<div className={style.teamContainer}>
		{data.map((cardData, index) => {
			return <ProjectTeamCard key={index} data={cardData} />
		})}
	</div>
	)
}