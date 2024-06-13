import NavTileButton from './NavTileButton';

export default function MobileNav() {
	return (
		<div className="mobileNav">
			<NavTileButton href="/projects/" icon="briefcase" />
			<NavTileButton href="/contact/" icon="mail" />
			<NavTileButton href="/blog/" icon="writing" />
			<NavTileButton href="/resume/" icon="gradCap" />
			<NavTileButton href="https://www.linkedin.com/in/henry-waill-b6228b69/" icon="linkedIn" />
			<NavTileButton href="https://www.instagram.com/henrywaill" icon="instagram" />
		</div>
	);
};