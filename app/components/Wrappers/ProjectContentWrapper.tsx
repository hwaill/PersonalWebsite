import { ReactNode } from "react";

export default function ProjectContentWrapper({
	children
} : {
	children: ReactNode
}) {
	return (
		<div className="projectContentWrapper">
			{children}
		</div>
	)
}