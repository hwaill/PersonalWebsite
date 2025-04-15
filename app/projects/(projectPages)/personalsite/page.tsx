import { ProjectImageBanner, ProjectImageFull } from '@/app/components/Projects/ProjectPageContent/ProjectImages';
import { ProjectParagraph, ProjectSection, ProjectSectionContinue, ProjectSubSection, ProjectSubSectionContinue } from '@/app/components/Projects/ProjectPageContent/ProjectSections';
import { ProjectOutline } from '@/app/types';
import { Metadata } from 'next'
import Link from 'next/link';
import React from 'react'

export const metadata : Metadata = {
	title: "My Website",
};

const PROJECT_DATA : ProjectOutline = {
	bannerImgUrl: "/img/projects/personalsite/banner.jpg",
	bannerImgStyle: '{"backgroundPosition":"center 61%"}',
	logoText: "My Website"
}

export default function Page() {
	return (
		<>
			<ProjectImageBanner data={PROJECT_DATA} />
			<ProjectSection heading="Project Overview">
				<ProjectParagraph>Well... you&apos;re looking at it! This personal website serves as a place for me to express myself and show off some of my work to the world! It&apos;s also a convenient opportunity for me to experiment with web development and design. What you&apos;re seeing here is the seventh iteration of this project. I like it... at least for the time being.</ProjectParagraph>
				<ProjectParagraph>I have spent <em>many</em> hours staring at this thing, and I&apos;ve certainly become blind to many ugly design decisions, bugs and misspellings that have made their homes here. I welcome feedback in all shapes and forms; feel free to <Link href="/contact">let me know</Link> about any issues!</ProjectParagraph>
			</ProjectSection>
			<ProjectSection heading="Project Breakdown">
				<ProjectParagraph>If I did it right, the details of how this project came to be shouldn&apos;t be as interesting as the end result, but I&apos;ll give a brief summary.</ProjectParagraph>
				<ProjectSubSection heading="Behind the Scenes">
					<ProjectParagraph>This website is built on <Link href="https://nextjs.org/">Next.js</Link>, which is built on <Link href="https://react.dev/">React</Link>..., and that is pretty much it! I use raw CSS and spent much of my time googling the same flexbox cheat sheet over and over to make it look the way it does. I may have used an animation library somewhere along the line for my navigation menu on mobile.</ProjectParagraph>
					<ProjectParagraph>For my contact form, I use <Link href="https://www.nodemailer.com/">Nodemailer</Link> to send myself emails from my own email account. It is rarely used, but it is <em>ready</em>. Finally, my magnum opus that will never see the light of day because I keep forgetting to work on it: my habits dashboard!</ProjectParagraph>
				</ProjectSubSection>
			</ProjectSection>
			<ProjectImageFull src="/img/projects/personalsite/habits.png" alt="" />
			<ProjectSectionContinue>
				<ProjectSubSectionContinue>
					<ProjectParagraph>Seeing my <Link href="/projects/todos">todos board</Link> collecting dust in my apartment motivated me to find a use for it in my own life. I decided to build a little API to allow <em>todos</em> to communicate with this website, and began work on a dashboard to display daily progress on my morning/evening routines. It works, too, but is not finished (and is not on pace to be finished anytime soon!) I am proud of the interaction, however, so maybe I&apos;ll get around to cleaning it up sometime in the future.</ProjectParagraph>
				</ProjectSubSectionContinue>
			</ProjectSectionContinue>
		</>
	)
}