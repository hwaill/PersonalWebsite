export default function ProjectLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<main className="projectPageContainer">
			<div className={"mainContentNoWrap neu"}>
				{children}
			</div>
		</main>
	);
}
