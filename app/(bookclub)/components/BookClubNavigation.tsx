"use client"

import { usePathname } from "next/navigation"

import style from "../bookClub.module.css"
import { BOOK_CLUB_NAV_ITEMS } from "../constants";
import Link from "next/link";

export default function BookClubNavigation (){
	const pathName = usePathname();

	return (
		<div className={style.bookClubNavigation}>
			<ul className={style.bookClubNavigationMenu}>
				{ BOOK_CLUB_NAV_ITEMS.map((item, index) => {
					return (
						<Link href={item.url} key={index}>
							<li className={(pathName.endsWith(item.url) ? style.bookClubNavigationMenuItemActive : "") + " " + style.bookClubNavigationMenuItem}>{item.title}</li>
						</Link>
					)
				})}
			</ul>
		</div>
	)
}