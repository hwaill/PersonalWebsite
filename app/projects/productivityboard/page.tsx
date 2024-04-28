import React from 'react'
import style from '../projects.module.css'

const Page = () => {
	return (
		<div className={style.pageContent + " neu neuShallow"}>
			<div className={style.fullImage} id={style.todosImage}>
				<div className={style.bannerDarken}>
					<img src="/img/todosLogoWhite.svg" className={style.bannerTitle} />
				</div>
			</div>
			<h3>Project Overview</h3>
			<p>The <em>todos productivity board</em> is a organization tool designed specifically to help those who struggle with executive dysfunction maintain better control in their day-to-day life. Responsibilities like keeping a consistent morning routine, remembering an upcoming event or commitment, or even keeping personal long-term goals front of mind (to name just a few) are often made difficult or impossible by executive dysfunction. The consequences of </p>
			<p>At the intersection of analog and digital technologies, <em>todos</em> combines tactile interaction on a familiar interface with the ability to track habit-building progress, trends in mood and much more.</p>
			<p>More than all this, however, the core of the project was to create a platform for communication and interaction that can adapt well to environments and use cases of many kinds. A whiteboard is, quite literally, a blank slate. </p>
			<h3>The Team</h3>
			<video src="/video/todosVideo.mp4" controls preload="meta" poster="/img/todosThumbnail.png" type="video/mp4" className={style.videoPlayer}></video>
		</div>
	)
}

export default Page