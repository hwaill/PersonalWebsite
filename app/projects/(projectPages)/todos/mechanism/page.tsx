import React from 'react'
import { Metadata } from 'next'

import { ProjectOutline } from '@/app/types'
import {
	ProjectImageBanner,
	ProjectImageHalf,
	ProjectImageThird,
	ProjectImageCollage, 
	ProjectImageFull } from '@/app/components/Projects/ProjectPageContent/ProjectImages'
import {
	ProjectParagraph,
	ProjectSection,
	ProjectSectionContinue,
	ProjectSubSection,
	ProjectSubSectionContinue } from '@/app/components/Projects/ProjectPageContent/ProjectSections'
import { ProjectVideoFull } from '@/app/components/Projects/ProjectPageContent/ProjectVideos'
import ProjectTeam from '@/app/components/Projects/ProjectPageContent/TeamCard/ProjectTeam'

export const metadata : Metadata = {
	title: "Todos Productivity Board"
};

const PROJECT_DATA: ProjectOutline = {
	bannerImgUrl: "/img/projects/todos/banner.jpg",
	logoImgUrl: "/img/projects/todos/logoWhite.svg",
	logoImgStyle: '{"height":"5rem"}'
}

export default function Page() {
	return (
		<>
			<ProjectImageBanner data={PROJECT_DATA} />
			<ProjectSection heading="A Closer Look: The Mechanism">
				<ProjectParagraph>Simply put, the <em>todos productivity board</em> is an organization tool designed specifically to help those who struggle with executive dysfunction maintain better control in their day&#x2011;to&#x2011;day life. A familiar whiteboard with an attached robotic dry-erase marker, this device reimagines task management and goal tracking, providing a new path towards structure that removes the distractions inherent in digital systems and lessens the energy costs associated with maintaining paper planners.</ProjectParagraph>
				<ProjectImageHalf src="/img/projects/todos/img2.jpg" alt="Close-up of the board shows the marker near a quote it's written. 'Be the change you wish to see in the world' can be partially seen." right={true} />
				<ProjectParagraph>Throughout the day, <em>todos</em> translates your digital to&#x2011;do lists and goals onto its surface, keeping you focused and organized. Users simply place magnets on the board to interact, triggering sensors that record task completion, as well as other metrics such as mood and self-assessments of productivity and sleep. Wifi connection allows for up-to-date information, like weather forecasts, to help users plan their day. With Bluetooth configuration via a custom web portal, the system can be easily customized to adapt perfectly to your workflow and goals.</ProjectParagraph>
				<ProjectParagraph>In addition to all of this, a core goal of this project was to create a platform for communication and interaction that can adapt well to environments and use cases of many kinds. A whiteboard is, quite literally, a blank slate. A robotic marker is a versatile communicator and the placement of magnets on a board is a fairly accessible user input system.</ProjectParagraph>
				<ProjectParagraph>Below, find the demo video for <em>todos</em>.</ProjectParagraph>
			</ProjectSection>
		</>
	);
};