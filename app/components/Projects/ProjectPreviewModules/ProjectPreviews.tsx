import React from 'react';
import style from './projectPreviewModules.module.css'
import Link from 'next/link';
import { Project } from '@/app/types';
import Image from 'next/image';

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
					<div className={style.featuredImageMainContainer}>
						<Image
							className={style.featuredImageMain}
							fill={true}
							sizes="(max-width: 600) 550px, (max-width: 1000) 685px, 875px"
							src={data.imgUrl}
							style={data.imgStyle ? JSON.parse(data.imgStyle) : {}}
							alt={data.imgAltText ? data.imgAltText : ""}
						/>
					</div>
					{data.hook && <h5 className={style.hook}>{data.hook}</h5>}
					<p className={style.description}>{data.description}</p>
					<div><Link href={data.linkUrl} className="button">Explore<div className="buttonIcon" style={{ WebkitMaskImage: 'url(/img/flaticon/arrow-right.svg)', maskImage: 'url(/img/flaticon/arrow-right.svg)' }}></div></Link></div>
				</div>
				<div className={style.featuredImageSideContainer}>
					<Image
						className={style.featuredImageSide}
						fill={true}
						sizes="575px"
						src={data.imgUrl}
						style={data.imgStyle ? JSON.parse(data.imgStyle) : {}}
						alt={data.imgAltText ? data.imgAltText : ""}
					/>
				</div>
			</div>
		</>
	);
};

export function ProjectPreviewSeeMore() {
	return (
		<>
			<div className={style.featuredContainer}>
				<div className={style.featuredContent}>
					<h4 className={style.heading}>Take a look at some others!</h4>
					<div className={style.seeMoreImageMainContainer}>
						<div><img src='/img/projects/controlleroverlays/banner.png' alt="" className={style.seeMoreImageMain} /></div>
						<div id={style.extraSeeMoreImageMain}><img src='/img/projects/personalwebsite/banner.jpg' alt="" className={style.seeMoreImageMain} /></div>
						<div><img src='/img/projects/generativeart/banner.png' alt="" className={style.seeMoreImageMain} /></div>
					</div>
					<p className={style.description}>There are more projects, big and small, to be found on the Projects page!</p>
					<div><Link href="/projects/" className="buttonSmall">See all projects<div className="buttonIcon" style={{ WebkitMaskImage: 'url(/img/flaticon/arrow-right.svg)', maskImage: 'url(/img/flaticon/arrow-right.svg)' }}></div></Link></div>
				</div>
				<div className={style.seeMoreImageSideContainer}>
					<div><img src='/img/projects/controlleroverlays/banner.png' alt="" className={style.seeMoreImageSide} /></div>
					<div><img src='/img/projects/personalwebsite/banner.jpg' alt="" className={style.seeMoreImageSide} /></div>
					<div><img src='/img/projects/generativeart/banner.png' alt="" className={style.seeMoreImageSide} /></div>
					<div><img src='/img/projects/drawingmachine/banner.jpg' alt="" className={style.seeMoreImageSide} /></div>
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
			<div className={style.otherContainer + " neu"}>
				<img className={style.otherImage} src={data.imgUrl} style={data.imgStyle ? JSON.parse(data.imgStyle) : {}} alt={data.imgAltText ? data.imgAltText : ""}></img>
				<div className={style.otherText}>
					<h4 className={style.heading}>{data.heading}</h4>
					<div className={style.projectTagsHolderOther}>
						{data.tags.map((name, key) => (
							<div key={key} className={style.projectTagOther}>{name}</div>
						))}
					</div>
					{data.hook && <h5 className={style.hook}>{data.hook}</h5>}
					<p className={style.descriptionOther}>{data.description}</p>
					<div className={style.buttonHolder}>
						{data.disabled ? (
							<div className={"buttonSmall " + style.disabled}>Coming soon...</div>
						) : (
							<Link href={data.linkUrl} className="buttonSmall">Explore <div className="buttonIcon" style={{ WebkitMaskImage: 'url(/img/flaticon/arrow-right.svg)', maskImage: 'url(/img/flaticon/arrow-right.svg)' }}></div></Link>
						)}
					</div>
				</div>
			</div>
		</>
	);
};