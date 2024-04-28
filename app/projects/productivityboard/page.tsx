import React from 'react'
import style from '../projects.module.css'
import TeamCard from '@/app/components/TeamCard/TeamCard'

const Page = () => {
	return (
		<div className={style.pageContent + " neu neuShallow"}>
			<div className={style.fullImage + " " + style.bannerImage} id={style.todosImage}>
				<div className={style.bannerDarken}>
					<img src="/img/projects/todos/logoWhite.svg" className={style.bannerTitle} />
				</div>
			</div>
			<h3>Project Overview</h3>
			<p>Simply put, the <em>todos productivity board</em> is an organization tool designed specifically to help those who struggle with executive dysfunction maintain better control in their day&#x2011;to&#x2011;day life. A familiar whiteboard with an attached robotic dry-erase marker, this device reimagines task management and goal tracking, providing a new path towards structure that removes the distractions inherent in digital systems and lessens the maintenance costs associated with paper planners.</p>
			<img src="/img/projects/todos/img2.jpg" className={style.halfImage + " " + style.right} />
			<p>Throughout the day, <em>todos</em> translates your digital to-do lists and goals onto its surface, keeping you focused and organized. Users simply place magnets on the board to interact, triggering sensors that record task completion, as well as other metrics such as mood and self-assessments of productivity and sleep. Wifi connection allows for up-to-date information, like weather forecasts, to help users plan their day. With Bluetooth configuration via a custom web portal, the system can be easily customized to adapt perfectly to your workflow and goals.</p>
			<p>In addition to all of this, a core goal of this project was to create a platform for communication and interaction that can adapt well to environments and use cases of many kinds. A whiteboard is, quite literally, a blank slate. A robotic marker is a versatile communicator and the placement of magnets on a board is a fairly accessible user input system.</p>
			<p>Below, find the demo video for <em>todos</em>.</p>
			<video controls preload="meta" poster="/img/projects/todos/videoThumbnail.png" className={style.videoPlayer}>
				<source src="https://www.itsshreeyo.com/hwhosting/todosVideo.mp4" type="video/mp4" />
			</video>
			<h3>Why This Matters</h3>
			<p>Responsibilities like keeping a consistent morning routine, remembering an upcoming event or commitment, or even keeping personal long-term goals front of mind (to name just a few) are often made difficult or impossible by executive dysfunction. The consequences of an individual lapse in attention may seem relatively small, but bills not paid, friends not spoken to and showers not taken, for example, can quickly add up to something more overwhelming.</p>
			<p>Most of our discussion about executive function, while working on this project, has focused on people who suffer from <em>Attention Deficit/Hyperactivity Disorder</em> (ADHD,) but it is important to acknowledge that many other conditions and diagnoses have been linked to executive dysfunction; Alzheimer&apos;s disease, epilepsy, head injury and substance abuse are just a few examples.</p>
			<h3>The Team</h3>
			<div className={style.teamContainer}>
				<TeamCard imgSrc="/img/projects/todos/henry.jpg" name="Henry Waill" desc="Hardware Design, Software Engineering" />
				<TeamCard imgSrc="/img/projects/todos/jason.jpg" name="Jason Fontillas" desc="User Experience Design" />
				<TeamCard imgSrc="/img/projects/todos/sydney.jpg" name="Sydney Calcagno" desc="User Interface Design" />
			</div>
		</div>
	)
}

export default Page