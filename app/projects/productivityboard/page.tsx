import React from 'react'
import style from '../projects.module.css'
import TeamCard from '@/app/components/TeamCard/TeamCard'
import Link from 'next/link'

const Page = () => {
	return (
		<div className={style.pageContent + " neu neuShallow"}>
			<div className={style.bannerImage} id={style.todosImage}>
				<div className={style.bannerDarken}>
					<img src="/img/projects/todos/logoWhite.svg" className={style.bannerTitle} />
				</div>
			</div>
			<h3>Project Overview</h3>
			<p>Simply put, the <em>todos productivity board</em> is an organization tool designed specifically to help those who struggle with executive dysfunction maintain better control in their day&#x2011;to&#x2011;day life. A familiar whiteboard with an attached robotic dry-erase marker, this device reimagines task management and goal tracking, providing a new path towards structure that removes the distractions inherent in digital systems and lessens the energy costs associated with maintaining paper planners.</p>
			<img src="/img/projects/todos/img2.jpg" className={style.halfImage + " " + style.right} />
			<p>Throughout the day, <em>todos</em> translates your digital to&#x2011;do lists and goals onto its surface, keeping you focused and organized. Users simply place magnets on the board to interact, triggering sensors that record task completion, as well as other metrics such as mood and self-assessments of productivity and sleep. Wifi connection allows for up-to-date information, like weather forecasts, to help users plan their day. With Bluetooth configuration via a custom web portal, the system can be easily customized to adapt perfectly to your workflow and goals.</p>
			<p>In addition to all of this, a core goal of this project was to create a platform for communication and interaction that can adapt well to environments and use cases of many kinds. A whiteboard is, quite literally, a blank slate. A robotic marker is a versatile communicator and the placement of magnets on a board is a fairly accessible user input system.</p>
			<p>Below, find the demo video for <em>todos</em>.</p>
			<video controls preload="meta" poster="/img/projects/todos/videoThumbnail.png" className={style.videoPlayer}>
				<source src="https://www.itsshreeyo.com/hwhosting/todosVideo.mp4" type="video/mp4" />
			</video>
			<h3>Why This Matters</h3>
			<p>Responsibilities like keeping a consistent morning routine, remembering an upcoming event or commitment, or even keeping personal long-term goals front of mind (to name just a few) are often made difficult or impossible by executive dysfunction. The consequences of an individual lapse in attention may seem relatively small, but bills not paid, friends not spoken to and showers not taken, for example, can quickly add up to something more overwhelming.</p>
			<p>Most of our discussion about executive function, while working on this project, has focused on people who suffer from <em>Attention Deficit/Hyperactivity Disorder</em> (ADHD,) but it is important to acknowledge that many other conditions and diagnoses have been linked to executive dysfunction; Alzheimer&apos;s disease, epilepsy, head injury and substance abuse are just a few examples.</p>
			<p>Many available tools can take a lot of focus and energy to keep up with. A written planner, for example, can only serve as a reminder if the user continually remembers to populate it with new information. Other popular tools use digital push notifications to alert the user, but these can often be tuned out in favor of more immediately-rewarding activities, like scrolling through social media feeds.</p>
			<h3>The Team</h3>
			<div className={style.teamContainer}>
				<TeamCard imgSrc="/img/projects/todos/henry.jpg" name="Henry Waill" desc="Hardware Design, Software Engineering" />
				<TeamCard imgSrc="/img/projects/todos/jason.jpg" name="Jason Fontillas" desc="User Experience Design" />
				<TeamCard imgSrc="/img/projects/todos/sydney.jpg" name="Sydney Calcagno" desc="User Interface Design" />
			</div>
			<p>This project served as the Senior Capstone Project for my degree in <em>Creative Technology and Design</em> at the University of Colorado, Boulder. My teammates, Jason Fontillas and Sydney Calcagno, and I worked together to transform this vision into a reality.</p>
			<h3>Project Breakdown</h3>
			<h4>At a glance...</h4>
			<p>The work that went into this project can primarily be broken down into four main categories: hardware, circuitry, software and user experience. My contributions were primarily in the hardware and software components; however, I felt like I added a lot to the project in all areas. After all, it is difficult to separate these three categories in practice when everything must work together seemlessly in the final product.</p>
			<h4>Hardware</h4>
			<img src="/img/projects/todos/img3.jpg" className={style.thirdImage + " " + style.right} />
			<p>At the core of this build (besides the whiteboard itself) is a 2-axis <em>Computer Numerical Control</em> (CNC) plotter. CNC devices allow for precise control over motion; in this case, we are moving a dry-erase marker on two axes. For this sort of construction, I turned towards a brand I&apos;m familiar with from some previous projects, <Link href="https://openbuilds.com/"><em>Openbuilds</em></Link>. <em>Openbuilds</em> has a modular system of parts that works well for designing these sorts of CNC machines; with aluminum extrusions, mounting hardware and linear actuator systems that are all compatible with one another, it was easy to prototype the plotter mechanism. Below is a video of some early testing of the linear actuators, and a more detailed look at the plotter mechanism construction can be found <Link href="productivityboard/mechanism/">here</Link>.</p>
			<video controls preload="meta" className={style.videoPlayer}>
				<source src="/img/projects/todos/vid1.mp4" type="video/mp4" />
			</video>
			<p>Quite a few other parts required more unique designs, so I opted to design and fabricate custom components to fill those gaps. Shown below are a few examples that I 3D printed; on the left is a servo-powered pen lift mechanism, and on the right is an example of a limit switch mount. Additionally, all of the mounts for the electronics, as well as some other brackets, were printed for the project.</p>
			<div className={style.collage}>
				<div className={style.collageMember}>
					<img src="/img/projects/todos/img4.jpg" className={style.collageImage} />
				</div>
				<div className={style.collageMember}>
					<img src="/img/projects/todos/img5.jpg" className={style.collageImage} />
				</div>
			</div>
			<p>A large challenge of the construction was related to the rigidity of the whiteboard itself. We found that it was very difficult to keep the whiteboard surface flat as the building went on. The weight of all of the moving components, as well as some inherent imbalances in the build, caused some significant warping in the board. I attempted a few fixes, including adhering steel bars to the back. What was most successful was mounting the entire construction to a sheet of thick MDF. This wasn't ideal due to the weight it added, but back-to-back presentations prohibited us from mounting it to a single wall for support.</p>
			<img src="/img/projects/todos/img6.jpg" className={style.thirdImage + " " + style.left} />
			<p>A final component of the build that improved the overall presentation of the project was the enclosure I fabricated. We understood from the start that the aesthetic of <em>todos</em> should be well-suited for an average home. Despite our pride in our electronics, it was best to hide them. A simple laser-cut box was the easiest solution, but I did my best to make it look presentable; I sanded down burnt edges and tried to be precise, even though this was my first attempt at making an enclosure like this.</p>
			<h4>Circuitry</h4>
			<p>The challenge of designing a circuit that could execute all of our initial ideas for the build while maintaining the ability to adapt to later changes was an exciting one. This was not too straightforward, and I had opted to challenge myself to create a printed circuit board (PCB) design to make the final product more elegant. This was my first foray into this sort of design process and I'm happy with what it yielded:</p>
			<img src="/img/projects/todos/img7.jpg" className={style.fullImage} />
		</div>
	)
}

export default Page