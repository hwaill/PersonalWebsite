import React from 'react';
import style from '../landing.module.css';
import Link from 'next/link';

const LandingLogoLink = () => {
	return (
		<Link className={style.landingLogoLink} href="/">
			<div className={style.landingLogo + ' neu neuShallow'}></div>
		</Link>
	);
};

export default LandingLogoLink;

