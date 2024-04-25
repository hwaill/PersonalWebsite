import React from 'react';
import LandingNav from './LandingNav/LandingNav';
import style from './landing.module.css';

const Landing = () => {
	return (
		<div className={style.landing}>
			<div className={style.landingContent}>
				<div className={style.landingSide}>
					<div className={style.landingLogo + ' neu neuShallow'}></div>
					<LandingNav />
				</div>
				<div className={style.landingText + ' neu neuShallow'}>
					<div className={style.tybaltHand}></div>
					<h1>
						Hello<span className="blueText">!</span>
					</h1>
					<h4>My name is Henry.</h4>
					<h4>I like making things that help people.</h4>
					{/* <h3>Scroll down to see my work.</h3> */}
				</div>
			</div>
		</div>
	);
};

export default Landing;
