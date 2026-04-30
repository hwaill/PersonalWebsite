'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavContext } from './NavContext';

export default function NavRail() {
	const { links } = useContext(NavContext);
	const pathname = usePathname();
	const isHome = pathname === '/';

	const railRef = useRef<HTMLDivElement>(null);
	const ruleRef = useRef<HTMLDivElement>(null);

	const [visible, setVisible] = useState(false);
	const [activeLink, setActiveLink] = useState('');
	const [cameFromSite, setCameFromSite] = useState(false);

	// Determine back vs home label based on in-session navigation history
	useEffect(() => {
		const lastPath = sessionStorage.getItem('lastPath');
		if (!isHome) {
			setCameFromSite(!!lastPath && lastPath !== pathname);
		}
		sessionStorage.setItem('lastPath', pathname);
	}, [pathname, isHome]);

	// Position rail and rule flush left of the content column.
	// Depends on `links` so it re-runs after the DOM mounts (early renders return null).
	useEffect(() => {
		const position = () => {
			const content = document.querySelector('.pageContent') as HTMLElement | null;
			if (!content || !railRef.current || !ruleRef.current) return;
			const contentLeft = content.getBoundingClientRect().left;
			// Rule sits 24px left of content; rail (72px wide) sits 28px left of rule
			const ruleX = contentLeft - 24;
			ruleRef.current.style.left = `${ruleX}px`;
			railRef.current.style.left = `${ruleX - 72 - 28}px`;
		};
		position();
		window.addEventListener('resize', position);
		return () => window.removeEventListener('resize', position);
	}, [links]);

	// Fade in rail + logo once the hero logo has scrolled fully out of view
	useEffect(() => {
		const onScroll = () => {
			const hero = document.querySelector('[data-nav-hero]') as HTMLElement | null;
			if (!hero) {
				setVisible(true);
				return;
			}
			setVisible(hero.getBoundingClientRect().bottom < 0);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	// Highlight the link whose section is currently in view.
	// No default active link — only highlights once a section is reached.
	// Forces the last link active when at the bottom of the page.
	useEffect(() => {
		if (links.length === 0) return;
		const onScroll = () => {
			const atBottom =
				window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
			if (atBottom) {
				setActiveLink(links[links.length - 1].href);
				return;
			}
			let current = '';
			links.forEach(({ href }) => {
				const id = href.startsWith('#') ? href.slice(1) : null;
				if (!id) return;
				const el = document.getElementById(id);
				if (el && window.scrollY >= el.offsetTop - 120) current = href;
			});
			setActiveLink(current);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [links]);

	return (
		<>
			<div id="nav-rail" ref={railRef}>
				<a
					href={isHome ? '#' : '/'}
					id="nav-rail-logo"
					className={visible ? 'visible' : ''}
					aria-label="Henry Waill"
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/img/logos/logoFlatTight.svg" alt="HW" />
				</a>
				{!isHome && (
					<a href="/" id="nav-back" className={visible ? 'visible' : ''}>
						{cameFromSite ? '← Back' : 'Home'}
					</a>
				)}
				<nav id="nav-links">
					{links.map(({ href, label }) => (
						<a
							key={href}
							href={href}
							className={`nav-link${activeLink === href ? ' active' : ''}`}
						>
							{label}
						</a>
					))}
				</nav>
			</div>
			<div id="nav-rule" ref={ruleRef} className={visible ? 'visible' : ''} />
		</>
	);
}
