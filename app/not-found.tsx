import { Metadata } from 'next';

import LogoLinkTile from './components/Tiles/LogoTile/LogoLinkTile';
import NavTile from './components/Tiles/NavTile/NavTile';
import style from './components/HomePageContent/Landing/landing.module.css';

export const metadata : Metadata = {
	title: "Page not found",
};

export default function NotFound() {
	return (
		<main>
			<div className="landingContainer">
				<div className="landingContent">
					<div className="landingNavHolder">
						<LogoLinkTile />
						<NavTile />
					</div>
					<div className='landingSquare neu'>
						<div className={style.tybaltHand2}></div>
						<div className={style.notFoundText}>
							<h1>Woah<span className="coralText">!</span></h1>
							{/* <h4 className={"subtitle"}>I can&apos;t find the page that you&apos;re looking for!</h4> */}
							<h6 className={"subtitle"}>Error 404: Page not found.</h6>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};