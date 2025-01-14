import { Metadata } from 'next'
import React from 'react'

import style from "./habits.module.css"

import Image from 'next/image'
import Link from 'next/link'
import { HabitDashboardParameters } from '@/app/types'
import HabitSmartButton from '@/app/components/HabitDashboard/HabitSmartButton'

export const metadata : Metadata = {
	title: "Habits",
}

export default function Habits() {
	return (
		<div className="pageTopMargin">
			<div className="sectionContent">
				<h2 className="blueText">Habits</h2>
				<div className={style.content}>
					<div className={style.fridgeImageHolder}>
						<Image
							className={style.fridgeImage}
							src="/img/homepage/habits/fridge.jpg"
							alt="" 
							fill={true}
							sizes="500px" />
					</div>
					<div className={style.text}>
						<p>I have ADHD. I know it probably sounds super fun, but it&apos;s proven to be a <em>real pain in my ass</em> quite a few times. I spent much of my life attempting to maintain positive habits through sheer willpower...; I didn&apos;t have much success.</p>
						<p>I&apos;ve found that, for me, making a habit tracking system that focuses on simple physical interactions is the most effective. I had always struggled with apps and other digital reminders that soon became easy-to-ignore background noise, and I found success in something as simple as a magnet on a refrigerator.</p>
						<p>Along with simplicity, I needed accountability. For building habits, that&apos;s always been my brother, Elias. I call him to remind him to take his creatine. He calls me to make sure I write content for this website. It&apos;s somewhat effective.</p>
						<p>That refrigerator has since been replaced by <Link href="/projects/todos/">todos productivity board</Link> and its ability to upload my triumphs and failures directly to the internet. Elias is still working hard, but I figure that the most powerful force of accountability is the fear that I&apos;ll embarrass myself in front of all the possible employers that I&apos;m encouraging to visit this very page. So, go ahead! Take a look at my habit tracking journey.</p>
						<HabitSmartButton />
					</div>
				</div>
			</div>
		</div>
	)
}