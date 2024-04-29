import React from 'react';
import LandingNav from './LandingNav/LandingNav';
import LandingLogo from './LandingLogo/LandingLogo';
import style from './landing.module.css';

const Landing = () => {
	return (
		<div className={style.landing}>
			<div className={style.landingContent}>
				<div className={style.landingSide}>
					<LandingLogo />
					<LandingNav />
				</div>
				<div className={style.landingText + ' neu neuShallow'}>
					<div className={style.tybaltHand}></div>
					<h1>
						Hello<span className="blueText">!</span>
					</h1>
					<h4 className={"subtitle"}>My name is Henry.</h4>
					<h4 className={"subtitle"}>I like making things that help people.</h4>
				</div>
			</div>
		</div>
	);
};

export default Landing;
