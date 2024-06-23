import React from 'react';
import style from './projectPreviewModules.module.css'
import Link from 'next/link';
import { Project } from '@/app/types';

export function ProjectPreviewFeatured({
	data
} : {
	data: Project
}) {
	return (
		<>
			<div className={style.featuredContainer}>
				<div className={style.featuredContent}>
					<h3 className={style.heading}>{data.heading}</h3>
					<div className={style.projectTagsHolder}>
						{data.tags.map((name, key) => (
							<div key={key} className={style.projectTag}>{name}</div>
						))}
					</div>
					<img className={style.featuredImageMain} src={data.imgUrl} style={data.imgStyle ? JSON.parse(data.imgStyle) : {}} alt={data.imgAltText ? data.imgAltText : ""}></img>
					{data.hook && <h5 className={style.hook}>{data.hook}</h5>}
					<p className={style.description}>{data.description}</p>
					<div><Link href={data.linkUrl} className="button">Explore <div className="buttonIcon" style={{ WebkitMaskImage: 'url(/img/flaticon/arrow-right.svg)', maskImage: 'url(/img/flaticon/arrow-right.svg)' }}></div></Link></div>
				</div>
				<div className={style.featuredImageSideContainer}>
					<img className={style.featuredImageSide} src={data.imgUrl} style={data.imgStyle ? JSON.parse(data.imgStyle) : {}} alt={data.imgAltText ? data.imgAltText : ""}></img>
				</div>
			</div>
		</>
	);
};

export function ProjectPreviewOther({
	data
} : {
	data: Project
}) {
	return (
		<>
			<div className={style.otherContainer}>
				<img className={style.otherImage} src={data.imgUrl} style={data.imgStyle ? JSON.parse(data.imgStyle) : {}} alt={data.imgAltText ? data.imgAltText : ""}></img>
				<div className={style.otherText}>
					<h4 className={style.heading}>{data.heading}</h4>
					<div className={style.projectTagsHolderOther}>
						{data.tags.map((name, key) => (
							<div key={key} className={style.projectTag}>{name}</div>
						))}
					</div>
					{data.hook && <h5 className={style.hook}>{data.hook}</h5>}
					<p className={style.descriptionOther}>{data.description}</p>
					<div><Link href={data.linkUrl} className="buttonSmall">Explore <div className="buttonIcon" style={{ WebkitMaskImage: 'url(/img/flaticon/arrow-right.svg)', maskImage: 'url(/img/flaticon/arrow-right.svg)' }}></div></Link></div>
				</div>
			</div>
		</>
	);
};