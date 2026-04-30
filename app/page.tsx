import AboutMe from "./components/homepage/aboutMe";
import Landing from "./components/homepage/landing";
import Projects from "./components/homepage/projects";
import { NavLinksRegistrar } from "./components/nav/NavLinksRegistrar";

export default function Page() {
	return (
		<main className="pageContent">
			<NavLinksRegistrar links={[
				{ href: '#work', label: 'Work' },
				{ href: '#about', label: 'About' },
			]} />
			<Landing />
			<section id="work"><Projects /></section>
			<section id="about"><AboutMe /></section>
		</main>
	);
};
