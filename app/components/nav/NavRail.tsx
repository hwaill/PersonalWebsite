'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavContext } from './NavContext';

function HomeIcon() {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z" />
			<path d="M9 21V12h6v9" />
		</svg>
	);
}

function BackArrow() {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M19 12H5" />
			<path d="M12 5l-7 7 7 7" />
		</svg>
	);
}

export default function NavRail() {
	const { links } = useContext(NavContext);
	const pathname = usePathname();
	const isHome = pathname === '/';
	const isStudio = pathname.startsWith('/studio');
	const isBookclub = pathname.startsWith('/bookclub');
	const bookclubBackHref = pathname === '/bookclub' ? '/' : '/bookclub';
	const bookclubBackLabel = pathname === '/bookclub' ? 'Home' : 'Book Club';

	const railRef = useRef<HTMLDivElement>(null);
	const ruleRef = useRef<HTMLDivElement>(null);

	const [visible, setVisible] = useState(false);
	const [activeLink, setActiveLink] = useState('');
	const [cameFromSite, setCameFromSite] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		if (isStudio) return;
		const lastPath = sessionStorage.getItem('lastPath');
		if (!isHome) {
			setCameFromSite(!!lastPath && lastPath !== pathname);
		}
		sessionStorage.setItem('lastPath', pathname);
	}, [pathname, isHome, isStudio]);

	useEffect(() => {
		if (isStudio) return;
		const position = () => {
			const content = document.querySelector('.pageContent') as HTMLElement | null;
			if (!content || !railRef.current || !ruleRef.current) return;
			const contentLeft = content.getBoundingClientRect().left;
			const ruleX = contentLeft - 24;
			ruleRef.current.style.left = `${ruleX}px`;
			railRef.current.style.left = `${ruleX - 72 - 28}px`;
		};
		position();
		window.addEventListener('resize', position);
		return () => window.removeEventListener('resize', position);
	}, [links, isStudio]);

	useEffect(() => {
		if (isStudio) return;
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
	}, [isStudio]);

	useEffect(() => {
		if (isStudio || links.length === 0) return;
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
				if (el && window.scrollY >= el.offsetTop - 240) current = href;
			});
			setActiveLink(current);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [links, isStudio]);

	useEffect(() => {
		setMobileOpen(false);
	}, [pathname]);

	if (isStudio) return null;

	return (
		<>
			{/* Desktop rail */}
			<div id="nav-rail" ref={railRef}>
				<a
					href={isHome ? '#' : isBookclub ? bookclubBackHref : '/'}
					id="nav-rail-logo"
					className={visible ? 'visible' : ''}
					aria-label="Henry Waill"
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/img/logos/logoFlatTight.svg" alt="HW" />
				</a>
				{!isHome && (
					isBookclub ? (
						<a href={bookclubBackHref} id="nav-back" aria-label={bookclubBackLabel}>
							<BackArrow />
						</a>
					) : cameFromSite ? (
						<button id="nav-back" onClick={() => history.back()} aria-label="Back">
							<BackArrow />
						</button>
					) : (
						<a href="/" id="nav-back" aria-label="Home">
							<HomeIcon />
						</a>
					)
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

			{/* Mobile top bar */}
			<div id="mobile-nav">
				<div className="mobile-nav-side">
					{!isHome && (
						isBookclub ? (
							<a href={bookclubBackHref} id="mobile-back" aria-label={bookclubBackLabel}>
								<BackArrow />
							</a>
						) : cameFromSite ? (
							<button id="mobile-back" onClick={() => history.back()} aria-label="Back">
								<BackArrow />
							</button>
						) : (
							<a href="/" id="mobile-back" aria-label="Home">
								<HomeIcon />
							</a>
						)
					)}
				</div>
				<a href={isHome ? '#' : isBookclub ? bookclubBackHref : '/'} className="mobile-nav-logo" aria-label="Henry Waill">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/img/logos/logoFlatTight.svg" alt="HW" />
				</a>
				<div className="mobile-nav-side">
					{links.length > 0 && (
						<button
							className={`mobile-menu-btn${mobileOpen ? ' open' : ''}`}
							onClick={() => setMobileOpen(o => !o)}
							aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
						>
							<span />
							<span />
							<span />
						</button>
					)}
				</div>
			</div>

			{/* Mobile drawer */}
			<div id="mobile-drawer" className={mobileOpen ? 'open' : ''}>
				{links.map(({ href, label }) => (
					<a
						key={href}
						href={href}
						className={`mobile-drawer-link${activeLink === href ? ' active' : ''}`}
						onClick={() => setMobileOpen(false)}
					>
						{label}
					</a>
				))}
			</div>

			<div id="nav-rule" ref={ruleRef} className={visible ? 'visible' : ''} />
		</>
	);
}
