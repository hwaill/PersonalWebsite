import style from "./aboutMe.module.css"

import Image from "next/image";

export default function AboutMe() {

	return (
		<div className="sectionContent">
			<h2 className="coralText">About Me</h2>
			<div className={style.aboutMeContent}>
				<div className={style.aboutMeText}>
					<h3>I hate writing these types of things.</h3>
					<p>I think I&apos;m a really likable guy! On the rare occasion, I&apos;ve even been told I&apos;m funny and intelligent... but you will learn <em>none of that</em> from the following paragraphs.</p>
					<p>My name is still Henry! I&apos;m an engineer and designer with a B.S. degree in Creative Technology and Design. I enjoy solving problems through programming, electronics, physical fabrication, web development and graphic design, among many other avenues. I love both learning and creating, both for their own sakes and for the sake of helping to solve all sorts of problems.</p>
					<p>I also enjoy playing piano, weaving, hiking with my dog and rock climbing.</p>
				</div>
				<div className={"neu " + style.aboutMeImageContainer}>
					<div className={style.aboutMeImageHolder}>
						<Image 
							className={style.aboutMeImage}
							src="/img/homepage/aboutMe.jpg"
      				alt="Close-up headshot of Henry"
							fill={true}
      				sizes="375px"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};