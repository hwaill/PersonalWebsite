import { PROJECTS } from "@/app/constants";
import { ProjectPreviewFeatured, ProjectPreviewOther } from "./ProjectPreviews";

import style from "./projectPreviewModules.module.css"

export function ProjectDisplayFeatured() {
	return (
		<div className={style.featuredProjectsContainer}>
			{PROJECTS.map((object, i) => (
				object.featured && <ProjectPreviewFeatured key={i} data={object} />
			))}
		</div>
	);
};

export function ProjectDisplayOther() {
	return (
		<div className={style.otherProjectsContainer}>
			{PROJECTS.map((object, i) => (
				!object.featured && <ProjectPreviewOther key={i} data={object} />
			))}
		</div>
	)
}