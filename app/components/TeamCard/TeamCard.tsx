import React from 'react';
import style from './teamCard.module.css';

export default function TeamCard({
	imgSrc, name, desc
} : {
	imgSrc: string;
	name: string;
	desc: string;
}) {
	return (
		<div className={style.card + " neu"}>
			<img src={imgSrc} className={style.cardImage} />
			<div className={style.cardName}>{name}</div>
			<div className={style.cardDescription}>{desc}</div>
		</div>
	);
};