import React from 'react';
import style from './teamCard.module.css';

const TeamCard = ({imgSrc, name, desc} : any) => {
	return (
		<div className={style.card + " neu neuShallow"}>
			<img src={imgSrc} className={style.cardImage} />
			<div className={style.cardName}>{name}</div>
			<div className={style.cardDescription}>{desc}</div>
		</div>
	);
};

export default TeamCard;