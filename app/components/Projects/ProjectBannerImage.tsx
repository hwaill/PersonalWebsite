import style from "./projects.module.css"

import { ProjectOutline } from "@/app/types";

export default function ProjectBannerImage({
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