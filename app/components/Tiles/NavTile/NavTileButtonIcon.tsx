export default function NavTileButtonIcon({
	icon,
}: {
	icon: string;
}) {
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
			iconParts = [{ color: 'coral', url: '/img/flaticon/fi-brands-linkedin.svg' }];
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
			iconParts = [{ color: 'green', url: '/img/flaticon/fi-rr-briefcase.svg'}];
			break;
		default:
	}

	return (
		<div className="navButton neu neuButton circle">
			{iconParts.map((object, i) => (
				<div key={i} className={'navIcon ' + object.color} style={{ WebkitMaskImage: 'url(' + object.url + ')', maskImage: 'url(' + object.url + ')' }}></div>
			))}
		</div>
	);
}