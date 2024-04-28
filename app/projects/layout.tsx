import style from "./projects.module.css";
import LandingLogoLink from "../components/Landing/LandingLogo/LandingLogoLink";
import LandingNav from "../components/Landing/LandingNav/LandingNav";
import Link from "next/link";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className={style.main}>
			<div className={style.navBar}>
				<LandingLogoLink />
				<LandingNav />
			</div>
			{children}
		</main>
	);
}
