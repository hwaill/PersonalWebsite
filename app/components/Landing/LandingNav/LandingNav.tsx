import React from 'react';
import LandingNavButton from './LandingNavButton';
import style from './landingNav.module.css';

const LandingNav = () => {
	return (
		<div className={style.landingNav + " neu neuShallow"}>
			<LandingNavButton href="/linkedIn/" icon="briefcase" />
			<LandingNavButton href="/insta/" icon="instagram" />
			<LandingNavButton href="/linkedIn/" icon="linkedIn" />
			<LandingNavButton href="/contact/" icon="mail" />
			<LandingNavButton href="/contact/" icon="writing" />
			<LandingNavButton href="/linkedIn/" icon="gradCap" />
		</div>
	);
};

export default LandingNav;
