import LogoLinkTile from "../components/Tiles/LogoTile/LogoLinkTile";
import NavTile from "../components/Tiles/NavTile/NavTile";

export default function ProjectLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<main className="projectPageContainer">
			<div className="landingNavHolder">
				<LogoLinkTile />
				<NavTile />
			</div>
			<div className={"mainContentNoWrap neu"}>
				{children}
			</div>
		</main>
	);
}
