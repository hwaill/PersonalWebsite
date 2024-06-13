import NavTileButton from './NavTileButton';
import { NAV_ITEMS } from '@/app/constants';
import { NavItem } from '@/app/types';

export default function NavTile() {
	return (
		<div className="navFlex neu">
			{NAV_ITEMS.map((item, index) => (
				<NavTileButton href={item.url} icon={item.icon}></NavTileButton>
			))}
		</div>
	);
};