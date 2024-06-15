"use client"

import style from "./projects.module.css"

export function ProjectVideoFull({
	url,
	type,
	posterUrl
} : {
	url: string,
	type: string,
	posterUrl?: string
}) {
	return (
		<>
			<div className={style.containerBig}>
				<video controls preload="meta" {...(posterUrl ? {poster: posterUrl} : {})} className={style.videoPlayer}>
					<source type={type} src={url} />
				</video>
			</div>
		</>
	)
}