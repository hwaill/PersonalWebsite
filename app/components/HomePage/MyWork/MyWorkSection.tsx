import React from 'react';
import style from './myWork.module.css'
import Link from 'next/link';
import { Project } from '@/app/types';

export default function MyWorkSection({
	data
} : {
	data: Project
}) {
	return (
		<>
			<div className={style.projectContainer}>
				<div className={style.mainContent}>
					<h3 className={style.heading}>{data.heading}</h3>
					<div className={style.projectTagsHolder}>
						{data.tags.map((name, key) => (
							<div key={key} className={style.projectTag}>{name}</div>
						))}
					</div>
					<img className={style.projectImageMain} src={data.imgUrl} style={data.imgStyle ? JSON.parse(data.imgStyle) : ""} alt={data.imgAltText ? data.imgAltText : ""}></img>
					<h5 className={style.hook}>{data.hook}</h5>
					<p className={style.description}>{data.description}</p>
					<div><Link href={data.linkUrl} className={style.button}>Explore <div className={style.buttonIcon} style={{ WebkitMaskImage: 'url(/img/flaticon/arrow-right.svg)', maskImage: 'url(/img/flaticon/arrow-right.svg)' }}></div></Link></div>
				</div>
				<div className={style.projectImageSideContainer}>
					<img className={style.projectImageSide} src={data.imgUrl} style={data.imgStyle ? JSON.parse(data.imgStyle) : ""} alt={data.imgAltText ? data.imgAltText : ""}></img>
				</div>
			</div>
		</>
	);
};