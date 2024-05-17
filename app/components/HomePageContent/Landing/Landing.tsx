import LogoTile from '../../Tiles/LogoTile/LogoTile';
import NavTile from '../../Tiles/NavTile/NavTile';
import tileStyle from '../../Tiles/tiles.module.css'

export default function Landing() {
	return (
		<div className={tileStyle.fullPageContainer}>
			<div className={tileStyle.contentCentered}>
				<div className={tileStyle.narrowVertical}>
					<LogoTile />
					<NavTile />
				</div>
				<div className={tileStyle.landingSquare + ' neu neuShallow'}>
					<div className={tileStyle.tybaltHand}></div>
					<h1>Hello<span className="blueText">!</span></h1>
					<h4 className={"subtitle"}>My name is Henry.</h4>
					<h4 className={"subtitle"}>I like making things that help people.</h4>
				</div>
			</div>
		</div>
	);
};