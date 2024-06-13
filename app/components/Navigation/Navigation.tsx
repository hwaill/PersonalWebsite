"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/app/constants";
import { NavItem } from "@/app/types";
import { AnimatePresence, easeOut, motion, spring, useCycle } from "framer-motion";

import style from "./navigation.module.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { MenuItem, MenuItemIcon, MenuItemWithSubMenu } from "./MenuItem";

export default function NavigationMobile() {
	const pathname = usePathname();


	return (
		<nav className = { style.navSidebar + " neuHeader" }>
			<div className={ style.navSidebarHeader }>
				<div className={style.navSidebarLogo}><Link href="/"></Link></div>
			</div>
			<div className = { style.navSidebarMenu } >
				<ul className = { style.navSidebarMenuList }>
					{ NAV_ITEMS.map((item, index) => {
						const isLastItem = index === NAV_ITEMS.length - 1;

						return (
							<div key={index}>
								{ item.subNav ? (
									<MenuItemWithSubMenu item={ item } className={ style.navSidebarMenuListItem + (isLastItem ? " " + style.navMobileMenuListItemLast : " ") }/>
								) : (
									<MenuItem className={ style.navSidebarMenuListItem + (isLastItem ? " " + style.navSidebarMenuListItemLast : " ") }>
										<Link href={ item.url } className={ style.navLink }>
											<div className={style.navButton}>
												{item.icon && (
													<MenuItemIcon icon={ item.icon } />
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
				</ul>
			</div>
		</nav>
	);
};