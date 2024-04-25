import React from 'react';
import Link from 'next/link';
import LandingNavButtonIcon from './LandingNavButtonIcon';
import style from './landingNav.module.css';

const LandingNavButton = ({href, icon} : any) => {
	return (
		<Link className={style.landingNavLink} href={href}>
			<LandingNavButtonIcon icon={icon} />
		</Link>
	)
}

export default LandingNavButton