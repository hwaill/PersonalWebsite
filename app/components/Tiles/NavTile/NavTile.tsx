import NavTileButton from './NavTileButton';
import style from '../tiles.module.css'

export default function NavTile() {
	return (
		<div className={style.nav + " neu neuShallow"}>
			<NavTileButton href="/projects/" icon="briefcase" />
			<NavTileButton href="https://www.instagram.com/henrywaill" icon="instagram" />
			<NavTileButton href="/linkedIn/" icon="linkedIn" />
			<NavTileButton href="/contact/" icon="mail" />
			<NavTileButton href="/blog/" icon="writing" />
			<NavTileButton href="/resume/" icon="gradCap" />
		</div>
	);
};