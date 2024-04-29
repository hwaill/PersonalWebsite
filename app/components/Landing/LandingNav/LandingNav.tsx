import React from 'react';
import LandingNavButton from './LandingNavButton';
import style from './landingNav.module.css';

const LandingNav = () => {
	return (
		<div className={style.landingNav + " neu neuShallow"}>
			<LandingNavButton href="/projects/" icon="briefcase" />
			<LandingNavButton href="https://www.instagram.com/henrywaill" icon="instagram" />
			<LandingNavButton href="/linkedIn/" icon="linkedIn" />
			<LandingNavButton href="/contact/" icon="mail" />
			<LandingNavButton href="/blog/" icon="writing" />
			<LandingNavButton href="/resume/" icon="gradCap" />
		</div>
	);
};

export default LandingNav;
