import Link from 'next/link';
import style from '../tiles.module.css';
import NavTileButtonIcon from './NavTileButtonIcon';

export default function NavTileButton({
	href, icon
} : {
	href: string;
	icon: string;
}) {
	return (
		<Link className={style.navLink} href={href}>
			<NavTileButtonIcon icon={icon} />
		</Link>
	);
};