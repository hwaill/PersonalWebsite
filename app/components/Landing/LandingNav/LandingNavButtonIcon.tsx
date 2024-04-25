import React from 'react';
import style from './landingNav.module.css';

const LandingNavButtonIcon = ({ icon }: any) => {
	var iconParts = [{ color: '', url: '' }];
	switch (icon) {
		case 'mailbox':
			iconParts = [{ color: 'green', url: '/img/flaticon/fi-rr-mail1.svg' }];
			break;
		case 'mail':
			iconParts = [{ color: 'blue', url: '/img/flaticon/fi-rr-envelope.svg' }];
			break;
		case 'instagram':
			iconParts = [
				{ color: 'blue', url: '/img/flaticon/fi-brands-insta1.svg' },
				{ color: 'green', url: '/img/flaticon/fi-brands-insta2.svg' },
				{ color: 'coral', url: '/img/flaticon/fi-brands-insta3.svg' },
			];
			break;
		case 'linkedIn':
			iconParts = [{ color: 'green', url: '/img/flaticon/fi-brands-linkedin.svg' }];
			break;
		case 'gradCap':
			iconParts = [{ color: 'coral', url: '/img/flaticon/fi-rr-gradCap.svg' }];
			break;
		case 'writing':
			iconParts = [
				{ color: 'blue', url: '/img/flaticon/fi-rr-writing1.svg' },
				{ color: 'green', url: '/img/flaticon/fi-rr-writing2.svg' },
			];
			break;
		case 'briefcase':
			iconParts = [{ color: 'coral', url: '/img/flaticon/fi-rr-briefcase.svg'}];
			break;
		default:
	}

	return (
		<div className={style.landingNavButton + " neu neuShallow neuButton circle"}>
			{iconParts.map((object, i) => (
				<div key={i} className={style.landingNavIcon + ' ' + object.color} style={{ WebkitMaskImage: 'url(' + object.url + ')', maskImage: 'url(' + object.url + ')' }}></div>
			))}
		</div>
	);
};

export default LandingNavButtonIcon;
