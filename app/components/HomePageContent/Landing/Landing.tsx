import LogoTile from '../../Tiles/LogoTile/LogoTile';
import NavTile from '../../Tiles/NavTile/NavTile';
import style from './landing.module.css';

export default function Landing() {
	return (
		<div className="landingContainer">
			<div className="landingContent">
				<div className="landingNavHolder">
					<LogoTile />
					<NavTile />
				</div>
				<div className="landingSquare neu">
					<div className={style.tybaltHand}></div>
					<h1 className={"landing"}>Hello<span className="blueText">!</span></h1>
					<h4 className={"landing"}>My name is Henry.</h4>
					<h4 className={"landing"}>I like making things that help people.</h4>
				</div>
			</div>
		</div>
	);
};