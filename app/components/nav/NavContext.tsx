'use client';

import { createContext, useState, ReactNode } from 'react';

export type NavLink = { href: string; label: string };

type NavContextType = {
	links: NavLink[];
	setLinks: (links: NavLink[]) => void;
};

export const NavContext = createContext<NavContextType>({
	links: [],
	setLinks: () => {},
});

export function NavProvider({ children }: { children: ReactNode }) {
	const [links, setLinks] = useState<NavLink[]>([]);
	return (
		<NavContext.Provider value={{ links, setLinks }}>
			{children}
		</NavContext.Provider>
	);
}
