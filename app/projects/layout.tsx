import tileStyle from "../components/Tiles/tiles.module.css"
import LogoLinkTile from "../components/Tiles/LogoTile/LogoLinkTile";
import NavTile from "../components/Tiles/NavTile/NavTile";

export default function ProjectLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<main className={tileStyle.textPageContainer}>
			<div className={tileStyle.narrowVertical}>
				<LogoLinkTile />
				<NavTile />
			</div>
			<div className={tileStyle.textPageMainContent + " neu neuShallow"}>
				{children}
			</div>
		</main>
	);
}
