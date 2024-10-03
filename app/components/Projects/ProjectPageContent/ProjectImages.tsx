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
					{data.logoImgUrl && 
						<img src={data.logoImgUrl} className={style.bannerTitle} style={data.logoImgStyle ? JSON.parse(data.logoImgStyle) : {}} />
					}
					{data.logoText &&
						<h4 className={style.bannerTitleText}>{data.logoText}</h4>
					}
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
			<div className={style.containerBig + " " + style.projectImageCollageHolder} style={{gridTemplateColumns: `${weight1}fr ${weight2}fr`}}>
				<div className={style.projectImageCollage}>
					<ProjectImage src={src1} alt={alt1} imgStyle={imgStyle1} />
				</div>
				<div className={style.projectImageCollage}>
					<ProjectImage src={src2} alt={alt2} imgStyle={imgStyle2} />
				</div>
			</div>
		</>
	);
};

export function ProjectImageCollageTriple({
	src1,
	src2,
	src3,
	alt1,
	alt2,
	alt3,
	imgStyle1,
	imgStyle2,
	imgStyle3,
	weight1,
	weight2,
	weight3,
}:{
	src1: string,
	src2: string,
	src3: string,
	alt1?: string,
	alt2?: string,
	alt3?: string,
	imgStyle1?: string,
	imgStyle2?: string,
	imgStyle3?: string,
	weight1?: number,
	weight2?: number
	weight3?: number
}) {
	return (
		<>
			<div className={style.containerBig + " " + style.projectImageCollageHolder} style={{gridTemplateColumns: `${weight1}fr ${weight2}fr ${weight3}fr`}}>
				<div className={style.projectImageCollage}>
					<ProjectImage src={src1} alt={alt1} imgStyle={imgStyle1} />
				</div>
				<div className={style.projectImageCollage}>
					<ProjectImage src={src2} alt={alt2} imgStyle={imgStyle2} />
				</div>
				<div className={style.projectImageCollage}>
					<ProjectImage src={src3} alt={alt3} imgStyle={imgStyle3} />
				</div>
			</div>
		</>
	);
};