import React from 'react';
import style from './teamCard.module.css';
import { TeamCardData } from '@/app/types';

export default function TeamCard({
	data
} : {
	data: TeamCardData
}) {
	return (
		<div className={style.card + " neu"}>
			<img src={data.imgSrc} alt={data.imgAltText ? data.imgAltText : ""} className={style.cardImage} />
			<div className={style.cardName}>{data.name}</div>
			<div className={style.cardDescription}>{data.desc}</div>
		</div>
	);
};