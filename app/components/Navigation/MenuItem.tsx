import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

import style from "./navigation.module.css";
import { NavItem } from "@/app/types";
import Link from "next/link";
import Icon from "../Icons/Icons";

export function MenuItem({
	className,
	children,
}: {
	className: string;
	children: ReactNode;
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
				},
			}}
			className={className}
		>
			{children}
		</motion.li>
	);
}

export function SubMenuItem({
	className,
	children,
}: {
	className: string;
	children: ReactNode;
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
				},
			}}
			className={className}
		>
			{children}
		</motion.li>
	);
}

export function MenuItemWithSubMenu({
	item,
	toggleOpen,
	className,
}: {
	item: NavItem;
	toggleOpen?: () => void;
	className: string;
}) {
	const pathname = usePathname();
	const [subMenuOpen, setSubMenuOpen] = useState(pathname.includes(item.url));

	return (
		<>
			<MenuItem className={className}>
				<button
					className={style.navItemButton}
					onClick={() => setSubMenuOpen(!subMenuOpen)}
				>
					<div className={style.navLinkWithSub}>
						<div className={style.navButton}>
							{item.icon && <Icon icon={item.icon} />}
						</div>
						<span
							className={
								pathname.includes(item.url) && !item.ignoreHighlight
									? style.activeNavLink + " " + style.navItemLabel
									: style.navItemLabel
							}
						>
							{item.title}
						</span>
						<div className={style.subMenuArrow}>
							<div className={subMenuOpen ? style.rotate180 : ""}></div>
						</div>
					</div>
				</button>
			</MenuItem>
			{subMenuOpen && (
				<div className={style.navSubMenu}>
					{item.subNavItems?.map((subItem, subIndex) => {
						return (
							<SubMenuItem
								key={subIndex}
								className={
									className +
									" " +
									style.navMenuListSubItem +
									(subIndex == 0 ? " " + style.navMenuListSubItemFirst : "")
								}
							>
								<Link
									href={subItem.url}
									onClick={toggleOpen ? () => toggleOpen() : () => null}
									className={style.navLink + (subItem.disabled ? " " + style.disabled : "")}
									{...(subItem.externalLink
										? { target: "_blank", rel: "noopener noreferrer" }
										: {})}
								>
									<div className={style.navButton}>
										{subItem.icon && <Icon icon={subItem.icon} />}
									</div>
									<span
										className={
											pathname.includes(subItem.url) && !subItem.ignoreHighlight
												? style.activeNavLink + " " + style.navItemLabel
												: style.navItemLabel
										}
									>
										{subItem.title}
									</span>
								</Link>
							</SubMenuItem>
						);
					})}
				</div>
			)}
		</>
	);
}