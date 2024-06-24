import { ProjectImageBanner, ProjectImageHalf } from '@/app/components/Projects/ProjectPageContent/ProjectImages';
import { ProjectParagraph, ProjectSection, ProjectSubSection } from '@/app/components/Projects/ProjectPageContent/ProjectSections';
import { ProjectVideoFull } from '@/app/components/Projects/ProjectPageContent/ProjectVideos';
import { ProjectOutline } from '@/app/types';
import { Metadata } from 'next'
import React from 'react'

export const metadata : Metadata = {
	title: "Sun Clock",
};

const PROJECT_DATA: ProjectOutline = {
	bannerImgUrl: "/img/projects/sunClock/banner.jpg",
	bannerImgStyle: '{"objectPosition":"8% center"}',
	logoImgUrl: "/img/projects/sunClock/logoWhite.svg",
	logoImgStyle: '{"height":"8em"}'
};

export default function Page() {
	return (
		<>
			<ProjectImageBanner data={PROJECT_DATA} />
			<ProjectSection heading="Project Overview">
				<ProjectParagraph><em>The Sun Clock</em> is wall decor that changes appearance to display the rising and setting of the sun each day. WiFi connectivity allows for the retrieval of up-to-date sunrise and sunset data to create accurate visual representions of the transitions between day and night, no matter the time zone, latitude or longitude.</ProjectParagraph>
				<ProjectParagraph>In addition to this core feature, <em>The Sun Clock</em> can display the time of day through an analog-clock-esque display. Alternatively, users can opt to use the device solely for decorative purposes through one of the multiple accent light settings.</ProjectParagraph>
				<ProjectParagraph>Below, find the demo video for <em>The Sun Clock</em>.</ProjectParagraph>
			</ProjectSection>
			<ProjectVideoFull url="https://www.itsshreeyo.com/hwhosting/todosVideo.mp4" type="video/mp4" posterUrl="/img/projects/todos/videoThumbnail.png" />
			<ProjectSection heading="Project Breakdown">
				<ProjectSubSection heading="At a glance...">
					<ProjectImageHalf src="/img/projects/sunClock/img1.jpg" alt="The Sun Clock is seen hanging on a wall, glowing from behind with a warm, white light." right={true} />
					<ProjectParagraph>This project served as the final project for <em>Object</em>, an undergraduate physical computing class at the University of Colorado, Boulder. The class focused on programming microcontrollers, fabricating enclosures and creating interactive systems to solve problems.</ProjectParagraph>
					<ProjectParagraph>The trajectory of this specific project strayed from the initial goal of emphasizing user interaction in favor of a more practical outcome; I wanted something that I would be happy to hang up in my apartment long after the novelty wore off.</ProjectParagraph>
				</ProjectSubSection>
				<ProjectSubSection heading="The Construction">
					<ProjectImageHalf src="/img/projects/sunClock/sketch1.jpg" alt="Inital, rough sketch of the intended design." right={true} />
					<ProjectParagraph>At the time of writing this, all that is left of the initial sketching phase is the poor-quality pencil drawing seen here. There were a few other designs that were considered, but the the simplicity and smoothness of the shapes felt the most pleasant. The vision for <em>The Sun Clock</em> was to have a flat, sun-shaped silhouette that was backlit by wall-facing LEDs. The desired flat design influenced the choice of materials, plywood. The plywood influenced the choice of manufacturing techniques, laser-cutting.</ProjectParagraph>
					<ProjectParagraph>With all this in mind (and a vision for the required circuitry, explained below,) modelling began </ProjectParagraph>
				</ProjectSubSection>
				<ProjectSubSection heading="The Circuitry">
					<ProjectParagraph>t</ProjectParagraph>
				</ProjectSubSection>
				<ProjectSubSection heading="The Software">
					<ProjectParagraph>t</ProjectParagraph>
				</ProjectSubSection>
			</ProjectSection>
		</>
	);
};