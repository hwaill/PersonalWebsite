import style from "./projects.module.css"

export default function ProjectMainVideo({
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
			<div className={style.clearFix}></div>
			<div className={style.containerBig}>
				<video controls preload="meta" {...(posterUrl ? {poster: posterUrl} : {})} className={style.videoPlayer}>
					<source src={url} type={type} />
				</video>
			</div>
		</>
	)
}