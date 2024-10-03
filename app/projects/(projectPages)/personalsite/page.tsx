import { ProjectImageBanner } from '@/app/components/Projects/ProjectPageContent/ProjectImages';
import { ProjectParagraph, ProjectSection } from '@/app/components/Projects/ProjectPageContent/ProjectSections';
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
				<ProjectParagraph>Well... you're looking at it! This personal website serves as a place for me to express myself and show off some of my work to the world! It&apos;s also a convenient opportunity for me to experiment with web development and design. What you&apos;re seeing here is the seventh iteration of this project. I like it... at least for the time being.</ProjectParagraph>
				<ProjectParagraph>I have spent <em>many</em> hours staring at this thing, and I&apos;ve certainly become blind to many ugly design decisions, bugs and misspellings that have made their homes here. I welcome feedback in all shapes and forms; feel free to <Link href="/contact">let me know</Link> about any issues!</ProjectParagraph>
			</ProjectSection>
		</>
	)
}