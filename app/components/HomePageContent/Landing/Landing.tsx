import LogoTile from '../../Tiles/LogoTile/LogoTile';
import NavTile from '../../Tiles/NavTile/NavTile';
import style from './landing.module.css';

export default function Landing() {
	return (
		<div className="fullScreenContainer">
			<div className="contentCenteredVert flexRowStart">
				<div className="narrowFlexColumn">
					<LogoTile />
					<NavTile />
				</div>
				<div className="landingSquare neu">
					<div className={style.tybaltHand}></div>
					<h1>Hello<span className="blueText">!</span></h1>
					<h4>My name is Henry.</h4>
					<h4>I like making things that help people.</h4>
				</div>
			</div>
		</div>
	);
};