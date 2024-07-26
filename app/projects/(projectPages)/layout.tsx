import ProjectContentWrapper from "../../components/Wrappers/ProjectContentWrapper";

export default function ProjectLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<ProjectContentWrapper>
			{children}
		</ProjectContentWrapper>
	);
};
