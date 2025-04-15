import { ProjectImageBanner, ProjectImageFull } from '@/app/components/Projects/ProjectPageContent/ProjectImages';
import { ProjectParagraph, ProjectSection, ProjectSectionContinue, ProjectSubSection, ProjectSubSectionContinue } from '@/app/components/Projects/ProjectPageContent/ProjectSections';
import { ProjectOutline } from '@/app/types';
import { Metadata } from 'next'
import Link from 'next/link';
import React from 'react'

export const metadata : Metadata = {
	title: "Park Bellevue Tower Website",
};

const PROJECT_DATA : ProjectOutline = {
	bannerImgUrl: "/img/projects/pbtsite/thumbnail.png",
	logoText: "Park Bellevue Tower"
}

export default function Page() {
	return (
		<>
			<ProjectImageBanner data={PROJECT_DATA} />
			<ProjectSection heading="Project Overview">
				<ProjectParagraph>This freelance web development opportunity came to me when the board of my brother&apos;s apartment complex needed help. They sent out a request for a developer to design and execute a resident portal web application for their building, and I got the job! This project would serve as good practice for me, and a great opportunity to learn and refine skills in web development.</ProjectParagraph>
				<ProjectParagraph>The design requirements were not too many or too difficult; This website was primarily informational, and was a way for administrators to communicate important updates and policies to residents. It was to be password-protected and would allow for residents to message one another. Finally, the content needed to be easily editable by administrators with varying levels of tech literacy. This is what I came up with. Feel free to check out the public-facing landing page at <Link href="https://parkbellevuetower.com">parkbellevuetower.com</Link>.</ProjectParagraph>
			</ProjectSection>
			<ProjectImageFull src="/img/projects/pbtsite/thumbnail.png" alt="" />
			<ProjectSection heading="Project Breakdown">
				<ProjectSubSection heading="Website Content">
					<ProjectParagraph>The content of this website, besides the landing page, falls into three main categories. Once a resident logs in, they can access important documents, they can view a news bulletin and they can see a directory of building residents. The content of the site is still being populated at the time of writing, so not all pages appear complete.</ProjectParagraph>
					<ProjectParagraph>The <em>Documents</em> section (pictured below) allows users to download various files, and is designed to make frequently asked questions easier to answer. The layout and organization of these documents is completely editable without any web development knowledge.</ProjectParagraph>
				</ProjectSubSection>
				<ProjectImageFull src="/img/projects/pbtsite/documents.png" alt="" />
				<ProjectSubSectionContinue>
					<ProjectParagraph>The <em>News Bulletin</em> section allows administrators to post updates and announcements for residents to consume. Pictured below is the primary bulletin page, but each post can be opened and read in its entirety on a separate page. Additionally, there is an emergency bulletin functionality, where ongoing and recently-resolved incidents are shown across the site with eye-catching banners.</ProjectParagraph>
				</ProjectSubSectionContinue>
				<ProjectImageFull src="/img/projects/pbtsite/news.png" alt="" />
				<ProjectSubSectionContinue>
					<ProjectParagraph>The <em>Resident Directory</em> allows residents to view and message one another to bring neighbors together. Each resident can opt in to having their name listed and separately can opt in to receiving messages from others. Messaging is via email, but the recipient&apos;s email address is never visible to the sender for the sake of privacy.</ProjectParagraph>
				</ProjectSubSectionContinue>
				<ProjectImageFull src="/img/projects/pbtsite/directory.png" alt="" />
				<ProjectSubSection heading="Editing Content">
					<ProjectParagraph>One of the most important parts of this project was to make the website as easy to use as possible for the various administrators that would be maintaining the site and generating content for it. If all goes well, I will not have to touch the site again unless some major changes need to be made. Because of this, I needed a <em>Content Management System</em>, and I chose to use <Link href="https://www.sanity.io/">Sanity</Link> for this role, and created a custom dashboard for administrators to use to easily and intuitively navigate and edit the content to be displayed.</ProjectParagraph>
				</ProjectSubSection>
				<ProjectImageFull src="/img/projects/pbtsite/cms.png" alt="" />
			</ProjectSection>
		</>
	)
}