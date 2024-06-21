import React from 'react';
import style from './projectTeam.module.css'
import { TeamCardData } from '@/app/types';
import Link from 'next/link';

export default function ProjectTeamCard({
	data
} : {
	data: TeamCardData
}) {
	return (
		<div className={style.card}>
			<img src={data.imgSrc} alt={data.imgAltText ? data.imgAltText : ""} className={style.cardImage} />
			<div className={style.cardName}>{data.name}</div>
			<div className={style.cardDescription}>{data.desc}</div>
			{data.linkUrl && (
				<Link href={data.linkUrl} target="_blank" rel="noopener noreferrer" className={style.cardButton}>Visit  <div className={style.cardButtonIcon} style={{ WebkitMaskImage: 'url(/img/flaticon/arrow-right.svg)', maskImage: 'url(/img/flaticon/arrow-right.svg)' }}></div></Link>
			)}
		</div>
	);
};