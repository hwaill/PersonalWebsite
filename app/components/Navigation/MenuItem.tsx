import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";


import style from "./navigation.module.css";
import { NavItem } from "@/app/types";
import Link from "next/link";

export function MenuItem({
	className,
	children,
} : {
	className: string,
	children: ReactNode,
}) {
	return (
		<motion.li
			initial={false}
			variants={{
				open: {
					y: 0,
					opacity: 1,
					transition: {
						y: { stiffness: 1000, velocity: -100 },
					},
				},
				closed: {
					y: 0,
					opacity: 0,
					transition: {
						y: { stiffness: 1000, velocity: -100 },
					},
				}
			}}
			className={ className }>
			{children}
		</motion.li>
	)
};

export function SubMenuItem({
	className,
	children,
} : {
	className: string,
	children: ReactNode,
}) {
	return (
		<motion.li
			variants={{
				open: {
					y: 0,
					opacity: 1,
					transition: {
						y: { stiffness: 1000, velocity: -100 },
					},
				},
				closed: {
					y: 0,
					opacity: 0,
					transition: {
						y: { stiffness: 1000, velocity: -100 },
					},
				}
			}}
			className={ className }>
			{children}
		</motion.li>
	)
};

export function MenuItemWithSubMenu({
	item,
	toggleOpen,
	className,
} : {
	item: NavItem,
	toggleOpen?: () => void,
	className: string,
}) {
	const pathname = usePathname();
	const [subMenuOpen, setSubMenuOpen] = useState(false);

	return (
		<>
			<MenuItem className={ className }>
				<button className={style.navItemButton} onClick={() => setSubMenuOpen(!subMenuOpen)}>
					<div className={ style.navLinkWithSub }>
						<div className={style.navButton}>
							{item.icon && (
								<MenuItemIcon icon={ item.icon } />
							)}
						</div>
						<span className={pathname.includes(item.url) && !item.ignoreHighlight ? (style.activeNavLink + ' ' + style.navItemLabel): style.navItemLabel}>
							{ item.title }
						</span>
						<div className={style.subMenuArrow}>
							<img className={subMenuOpen ? style.rotate180 : ""} src="img/flaticon/chevron-double-down.svg" alt="" />
						</div>
					</div>
				</button>
			</MenuItem>
			{subMenuOpen && (
				<div className={style.navSubMenu}>
					{item.subNavItems?.map((subItem, subIndex) => {
						return (
							<SubMenuItem key={subIndex} className={className + " " + style.navMenuListSubItem + (subIndex == 0 ? " " + style.navMenuListSubItemFirst : "")}>
								<Link href={ subItem.url } onClick={toggleOpen ? () => toggleOpen() : () => null} className={ style.navLink }>
									<div className={style.navButton}>
										{subItem.icon && (
											<MenuItemIcon icon={ subItem.icon } />
										)}
									</div>
									<span className={pathname.includes(subItem.url) && !subItem.ignoreHighlight ? (style.activeNavLink + ' ' + style.navItemLabel): style.navItemLabel}>
										{ subItem.title }
									</span>
								</Link>
							</SubMenuItem>
						)
					})}
				</div>
			)}
		</>
	)
}

export function MenuItemIcon({
	icon
} : {
	icon: string
}) {
	var iconParts = [{ color: '', url: '' }];
	switch (icon) {
		case 'mailbox':
			iconParts = [{ color: 'green', url: '/img/flaticon/fi-rr-mail1.svg' }];
			break;
		case 'mail':
			iconParts = [{ color: 'blue', url: '/img/flaticon/fi-rr-envelope.svg' }];
			break;
		case 'instagram':
			iconParts = [
				{ color: 'blue', url: '/img/flaticon/fi-brands-insta1.svg' },
				{ color: 'green', url: '/img/flaticon/fi-brands-insta2.svg' },
				{ color: 'coral', url: '/img/flaticon/fi-brands-insta3.svg' },
			];
			break;
		case 'linkedIn':
			iconParts = [{ color: 'coral', url: '/img/flaticon/fi-brands-linkedin.svg' }];
			break;
		case 'gradCap':
			iconParts = [{ color: 'coral', url: '/img/flaticon/fi-rr-gradCap.svg' }];
			break;
		case 'writing':
			iconParts = [
				{ color: 'blue', url: '/img/flaticon/fi-rr-writing1.svg' },
				{ color: 'green', url: '/img/flaticon/fi-rr-writing2.svg' },
			];
			break;
		case 'briefcase':
			iconParts = [{ color: 'green', url: '/img/flaticon/fi-rr-briefcase.svg'}];
			break;
		default:
	}


	return (
		<>
			{iconParts.map((object, i) => (
				<div key={i} className={style.navIcon + ' ' + object.color} style={{ WebkitMaskImage: 'url(' + object.url + ')', maskImage: 'url(' + object.url + ')' }}></div>
			))}
		</>
	)
}