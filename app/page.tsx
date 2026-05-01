import AboutMe from "./components/homepage/aboutMe";
import Contact from "./components/homepage/contact";
import Landing from "./components/homepage/landing";
import Other from "./components/homepage/other";
import Projects from "./components/homepage/projects";
import Resume from "./components/homepage/resume";
import { NavLinksRegistrar } from "./components/nav/NavLinksRegistrar";

export default function Page() {
	return (
		<main className="pageContent">
			<NavLinksRegistrar links={[
				{ href: '#work', label: 'Work' },
				{ href: '#about', label: 'About' },
				{ href: '#resume', label: 'Resume'},
				{ href: '#contact', label: 'Contact' },
				{ href: '#other', label: 'Other'}
			]} />
			<Landing />
			<section id="work"><Projects /></section>
			<section id="about"><AboutMe /></section>
			<section id="resume"><Resume /></section>
			<section id="contact"><Contact /></section>
			<section id="other"><Other /></section>
		</main>
	);
};
