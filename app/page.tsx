import AboutMe from "./components/homepage/aboutMe";
import Landing from "./components/homepage/landing";
import Projects from "./components/homepage/projects";
import { figtree } from "./layout";

export default function Page() {
	return (
		<main className="pageContent">
			<Landing />
			<Projects />
			<AboutMe />
		</main>
	);
};
