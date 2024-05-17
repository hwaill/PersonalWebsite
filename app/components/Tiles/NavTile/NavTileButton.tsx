import Link from 'next/link';
import NavTileButtonIcon from './NavTileButtonIcon';

export default function NavTileButton({
	href, icon
} : {
	href: string;
	icon: string;
}) {
	return (
		<Link className="navLink" href={href}>
			<NavTileButtonIcon icon={icon} />
		</Link>
	);
};