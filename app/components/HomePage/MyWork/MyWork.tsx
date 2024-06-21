import React from 'react';
import ProjectPreview from '../../Projects/ProjectPreviewModules/ProjectPreview';
import { PROJECTS } from '@/app/constants';



export default function MyWork() {
	return (
		<div className="homePageSection">
			<h2 className="blueText">Featured Projects</h2>
			{PROJECTS.map((object, i) => (
				<ProjectPreview key={i} data={object} />
			))}
		</div>
	);
}