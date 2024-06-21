import { ProjectImageBanner } from '@/app/components/Projects/ProjectImages';
import { ProjectParagraph, ProjectSection } from '@/app/components/Projects/ProjectSections';
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
				<ProjectParagraph><em>The Sun Clock</em> is </ProjectParagraph>
			</ProjectSection>
		</>
	);
};