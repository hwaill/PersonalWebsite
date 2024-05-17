import NavTileButton from './NavTileButton';

export default function NavTile() {
	return (
		<div className="navFlex neu">
			<NavTileButton href="/projects/" icon="briefcase" />
			<NavTileButton href="https://www.instagram.com/henrywaill" icon="instagram" />
			<NavTileButton href="/linkedIn/" icon="linkedIn" />
			<NavTileButton href="/contact/" icon="mail" />
			<NavTileButton href="/blog/" icon="writing" />
			<NavTileButton href="/resume/" icon="gradCap" />
		</div>
	);
};