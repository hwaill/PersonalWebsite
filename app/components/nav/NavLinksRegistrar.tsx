'use client';

import { useContext, useEffect } from 'react';
import { NavContext, NavLink } from './NavContext';

export function NavLinksRegistrar({ links }: { links: NavLink[] }) {
	const { setLinks } = useContext(NavContext);

	useEffect(() => {
		setLinks(links);
		return () => setLinks([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
}
