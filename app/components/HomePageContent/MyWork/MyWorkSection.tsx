import React from 'react';
import style from './myWork.module.css'
import Link from 'next/link';

export default function MyWorkSection({
	data
} : {
	data: {
		heading: string,
		tags: string[],
		hook: string,
		description: string,
		imgUrl: string,
		imgStyle: string,
		linkUrl: string
	}
}) {
	return (
		<>
			<div className={style.projectContainer + " neu"}>
				<div className={style.firstText}>
					<h3>{data.heading}</h3>
					<div className={style.projectTagsHolder}>
						{data.tags.map((name, key) => (
							<div key={key} className={style.projectTag + " neu"}>{name}</div>
						))}
					</div>
				</div>
				<img className={style.projectImage} src={data.imgUrl} style={JSON.parse(data.imgStyle)}></img>
				<div className={style.secondText}>
					<h5>{data.hook}</h5>
					<p>{data.description}</p>
				</div>
				<div className={style.forceWrap}></div>
			</div>
		</>
	);
};