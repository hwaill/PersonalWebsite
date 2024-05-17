import { Metadata } from 'next';

import LogoLinkTile from './components/Tiles/LogoTile/LogoLinkTile';
import NavTile from './components/Tiles/NavTile/NavTile';

export const metadata : Metadata = {
	title: "Page not found",
};

export default function NotFound() {
	return (
		<main>
			<div className="fullScreenContainer">
				<div className="contentCenteredVert flexRowStart">
					<div className="narrowFlexColumn">
						<LogoLinkTile />
						<NavTile />
					</div>
					<div className='landingSquare landingSquareAdaptable neu'>
						<h1>Woah<span className="coralText">!</span></h1>
						<h4 className={"subtitle"}>I can&apos;t find the page that you&apos;re looking for!</h4>
						<h6 className={"subtitle"}>Error 404: Not found.</h6>
					</div>
				</div>
			</div>
		</main>
	);
};