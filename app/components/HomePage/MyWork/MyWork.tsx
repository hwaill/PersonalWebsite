import React from 'react';
import { ProjectDisplayFeatured } from '../../Projects/ProjectPreviewModules/ProjectDisplays';

export default function MyWork() {
	return (
		<div className="homePageSection">
			<h2 className="blueText">Featured Projects</h2>
			<ProjectDisplayFeatured />
		</div>
	);
}