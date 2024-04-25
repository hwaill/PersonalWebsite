import React from 'react';
import LandingNavButton from './LandingNavButton';
import style from './landingNav.module.css';

const LandingNav = () => {
	return (
		<div className={style.landingNav + " neu neuShallow"}>
			<LandingNavButton href="/insta/" icon="instagram" />
			<LandingNavButton href="/linkedIn/" icon="linkedIn" />
			<LandingNavButton href="/contact/" icon="mail" />
			<LandingNavButton href="/contact/" icon="writing" />
			<LandingNavButton href="/linkedIn/" icon="gradCap" />
			<LandingNavButton href="/linkedIn/" icon="briefcase" />
		</div>
	);
};

export default LandingNav;
