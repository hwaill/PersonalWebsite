"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/app/constants";
import { NavItem } from "@/app/types";
import { easeOut, motion, useCycle } from "framer-motion";

import style from "./navigation.module.css";
import { MenuItem, MenuItemWithSubMenu } from "./MenuItem";
import Icon from "../Icons/Icons";

export default function NavigationMobile() {
	const pathname = usePathname();
	const [isOpen, toggleOpen] = useCycle(false, true);


	return (
		<nav className = { style.navMobile + ( isOpen ? "" : " " + style.hidden) }>
			<motion.div
				animate={isOpen ? 'open' : 'closed'}
				variants={{
					open: {
						height: '100dvh'
					},
					closed: {
						height: 'auto'
					}
				}}
				initial={false}
				transition={{
					ease: easeOut,
				}}
				className="neuHeader">
				<div className={ style.header }>
					<div className={style.headerLogo}><Link aria-label="Click logo to return home" href="/"></Link></div>
					<MenuToggle toggle={toggleOpen}/>
				</div>
				<div className = { style.navMobileMenu } >
					<motion.ul
						initial={false}
						variants={{
							open: {
								transition: { staggerChildren: 0.02, delayChildren: 0.15 },
							},
							closed: {
								// transition: { staggerChildren: 0.01, staggerDirection: -1 },
							}
						}}
						className = { style.navMobileMenuList }>
						{ NAV_ITEMS.map((item, index) => {
							const isLastItem = index === NAV_ITEMS.length - 1;

							return (
								<div key={index}>
									{ item.subNav ? (
										<MenuItemWithSubMenu item={ item } toggleOpen={ toggleOpen } className={ style.navMobileMenuListItem + (isLastItem ? " " + style.navMobileMenuListItemLast : " ") }/>
									) : (
										<MenuItem className={ style.navMobileMenuListItem + (isLastItem ? " " + style.navMobileMenuListItemLast : " ") }>
											<Link href={ item.url } onClick={() => toggleOpen()} className={ style.navLink + (item.disabled ? " " + style.disabled : "")} {...(item.externalLink ? {target: "_blank", rel: "noopener noreferrer"} : {})}>
												<div className={style.navButton}>
													{item.icon && (
														<Icon icon={ item.icon } />
													)}
												</div>
												<span className={pathname.includes(item.url) && !item.ignoreHighlight ? (style.activeNavLink + ' ' + style.navItemLabel): style.navItemLabel}>
													{ item.title }
												</span>
											</Link>
										</MenuItem>
									)}
								</div>
							)
						})}
					</motion.ul>
				</div>
			</motion.div>
		</nav>
	);
};

function MenuToggle({
	toggle
}: {
	toggle: () => void
}) {
	return (
		<button
			className={style.navItemButton + " " + style.hamburger}
			onClick={toggle}
		>
			<svg width="40" height="40" viewBox="0 0 40 40">
				<Path
					initial={false}
					variants={{
						closed: { d: 'M 4 8 L 36 8' },
						open: { d: 'M 8.686 8.686 L 31.314 31.314' },
					}}
				/>
				<Path
					initial={false}
					d="M 4 20 L 36 20"
					variants={{
						closed: { opacity: 1 },
						open: { opacity: 0 },
					}}
					transition={{ duration: 0.1 }}
				/>
				<Path
					initial={false}
					variants={{
						closed: { d: 'M 4 32 L 36 32' },
						open: { d: 'M 8.686 31.314 L 31.314 8.686' },
					}}
				/>
			</svg>
		</button>
	)
};

function Path(props: any) {
	return (
		<motion.path
			fill="transparent"
			strokeWidth="4"
			stroke="hsl(235, 21%, 21%)"
			strokeLinecap="round"
			{...props}
		/>
	)
};