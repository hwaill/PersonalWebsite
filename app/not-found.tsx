import tileStyle from './components/Tiles/tiles.module.css';
import { Metadata } from 'next';

import LogoLinkTile from './components/Tiles/LogoTile/LogoLinkTile';
import NavTile from './components/Tiles/NavTile/NavTile';

export const metadata : Metadata = {
	title: "Page not found",
};

export default function NotFound() {
	return (
		<main>
			<div className={tileStyle.fullPageContainer}>
			<div className={tileStyle.contentCentered}>
				<div className={tileStyle.narrowVertical}>
					<LogoLinkTile />
					<NavTile />
				</div>
				<div className={tileStyle.landingSquare + ' ' + tileStyle.landingSquareAdaptable + ' neu neuShallow'}>
					<h1>Woah<span className="coralText">!</span></h1>
					<h4 className={"subtitle"}>I can't find the page that you're looking for!</h4>
					<h6 className={"subtitle"}>Error 404: Not found.</h6>
				</div>
			</div>
		</div>
		</main>
	);
};