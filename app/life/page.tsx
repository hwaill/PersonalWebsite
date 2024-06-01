import LogoLinkTile from "../components/Tiles/LogoTile/LogoLinkTile";
import NavTile from "../components/Tiles/NavTile/NavTile";

export default function Life() {
	return (
		<main className="fullContentContainer flexRowStartNoWrap">
			<div className="narrowFlexColumn">
				<LogoLinkTile />
				<NavTile />
			</div>
			<div className={"lifeContentNoWrap neu"}>
				<h2>Habit Tracking</h2>
			</div>
		</main>
	);
}