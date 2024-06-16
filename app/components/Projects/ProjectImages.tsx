import style from "./projects.module.css"

import { ProjectOutline } from "@/app/types";

export function ProjectImageBanner({
	data
}:{
	data: ProjectOutline
}) {
	return (
		<>
			<div className={style.bannerImage} style={JSON.parse('{"backgroundImage":"url(' + data.bannerImgUrl + ')"'+ (data.bannerImgStyle ? ',' + data.bannerImgStyle.substring(1, data.bannerImgStyle.length - 1) : "") + '}')}>
				<div className={style.bannerDarken}>
					<img src={data.logoImgUrl} className={style.bannerTitle} style={data.logoImgStyle ? JSON.parse(data.logoImgStyle) : ""} />
				</div>
			</div>
		</>
	)
}

export function ProjectImage({
	src,
	alt,
	imgStyle
}:{
	src: string,
	alt?: string,
	imgStyle?: string
}) {
	return (
		<>
			<img src={src} className={style.projectImage} alt={alt} style={imgStyle ? JSON.parse(imgStyle) : {}} />
		</>
	)
}

export function ProjectImageFull({
	src,
	alt,
	imgStyle
}:{
	src: string,
	alt?: string,
	imgStyle?: string
}) {
	return (
		<>
			<div className={style.clearFix}></div>
			<div className={style.containerBig + " " + style.projectImageFull}>
				<ProjectImage src={src} alt={alt} imgStyle={imgStyle} />
			</div>
		</>
	);
};

export function ProjectImageHalf({
	src,
	alt,
	imgStyle,
	left,
	right
}:{
	src: string,
	alt?: string,
	imgStyle?: string,
	left?: boolean,
	right?: boolean
}) {
	return (
		<>
			<div className={(left ? style.left : (right ? style.right : style.center)) + " " + style.projectImageHalf}>
				<ProjectImage src={src} alt={alt} imgStyle={imgStyle} />
			</div>
		</>
	);
};