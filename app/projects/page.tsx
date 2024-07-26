import { Metadata } from 'next'
import React from 'react'
import { ProjectDisplayFeatured, ProjectDisplayOther } from '../components/Projects/ProjectPreviewModules/ProjectDisplays';

export const metadata : Metadata = {
	title: "Projects"
};

export default function Page() {
	return (
		<div className="pageTopMargin">
			<div className="sectionContent">
				<h2 className="blueText">My Projects</h2>
				<ProjectDisplayFeatured />
				<h3>Other Projects</h3>
				<ProjectDisplayOther />
			</div>
		</div>
	)
}