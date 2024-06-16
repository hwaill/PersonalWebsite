import ProjectWrapper from "../components/Wrappers/ProjectWrapper";

export default function ProjectLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<ProjectWrapper>
			{children}
		</ProjectWrapper>
	);
};
