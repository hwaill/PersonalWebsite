import style from "./work.module.css";
import LandingLogoLink from "../components/Landing/LandingLogo/LandingLogoLink";
import LandingNav from "../components/Landing/LandingNav/LandingNav";
import Link from "next/link";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className={style.main}>
			<div className={style.navBar}>
				<LandingLogoLink />
				<LandingNav />
			</div>
			<div className={style.pageContent + " neu neuShallow"}>
				{children}
			</div>
		</main>
	);
}
