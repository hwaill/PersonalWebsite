import React from 'react';
import style from './myWork.module.css'
import Link from 'next/link';

export default function MyWorkSection({
	imgUrl, imgStyle, logoUrl, logoStyle, description, linkUrl
} : {
	imgUrl: string;
	imgStyle: string;
	logoUrl: string;
	logoStyle: string;
	description: string;
	linkUrl: string;
}) {
	return (
		<>
			<div className={style.projectContainer + " neu"}>
				<div className={style.projectImageHolder}>
					<img src={imgUrl} className={style.projectImage} style={JSON.parse(imgStyle)}/>
				</div>
				<div className={style.projectText}>
					<img src={logoUrl} style={JSON.parse(logoStyle)} />
					<div className={style.description} dangerouslySetInnerHTML={{__html: description}}></div>
					<Link href={linkUrl}>
						<div className={style.learnMore + " neu neuButton"}>Learn more</div>
					</Link>
				</div>
			</div>
		</>
	);
};