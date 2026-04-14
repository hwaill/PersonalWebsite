import AboutMe from "./components/homepage/aboutMe";
import Landing from "./components/homepage/landing";
import { figtree } from "./layout";

export default function Page() {
	return (
		<main className="pageContent">
			<Landing />
			<AboutMe />
		</main>
	);
};
