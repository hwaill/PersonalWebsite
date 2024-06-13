"use client"

import { usePathname } from "next/navigation";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import useScroll from "@/hooks/useScroll";

import style from "./navigation.module.css";

export default function Navigation() {
	const currentSegment = useSelectedLayoutSegment();
	return (
		<div className={style.navDesktop}>
			<h4>Navigation</h4>
		</div>
	);
};