import { Metadata } from 'next'
import React from 'react'
import ProjectBrowser from '../components/Projects/ProjectBrowser/ProjectBrowser';
import { ProjectDisplayFeatured, ProjectDisplayOther } from '../components/Projects/ProjectPreviewModules/ProjectDisplays';

export const metadata : Metadata = {
	title: "Projects"
};

export default function Page() {
	return (
		<div className="pageTopMargin">
			<div className="homePageSection">
				<h2 className="blueText">My Projects</h2>
				<h3></h3>
				<p></p>
				<ProjectBrowser />
				<ProjectDisplayFeatured />
				<h3>Other Projects</h3>
				<ProjectDisplayOther />
			</div>
		</div>
	)
}