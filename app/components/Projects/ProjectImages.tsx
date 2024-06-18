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

export function ProjectImageThird({
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
			<div className={(left ? style.left : (right ? style.right : style.center)) + " " + style.projectImageThird}>
				<ProjectImage src={src} alt={alt} imgStyle={imgStyle} />
			</div>
		</>
	);
};

export function ProjectImageCollage({
	src1,
	src2,
	alt1,
	alt2,
	imgStyle1,
	imgStyle2,
	weight1,
	weight2
}:{
	src1: string,
	src2: string,
	alt1?: string,
	alt2?: string,
	imgStyle1?: string,
	imgStyle2?: string,
	weight1?: number,
	weight2?: number
}) {
	return (
		<>
			<div className={style.projectImageCollageHolder} style={{gridTemplateColumns: `${weight1}fr ${weight2}fr`}}>
				<div className={style.projectImageCollageFirst}>
					<ProjectImage src={src1} alt={alt1} imgStyle={imgStyle1} />
				</div>
				<div className={style.projectImageCollageSecond}>
					<ProjectImage src={src2} alt={alt2} imgStyle={imgStyle2} />
				</div>
			</div>
		</>
	);
};