import style from '../tiles.module.css';
import Link from 'next/link';

export default function LogoLinkTile() {
	return (
		<Link className={style.logoLink} href="/">
			<div className={style.logo + ' neu neuShallow'}></div>
		</Link>
	);
};