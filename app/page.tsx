import Landing from './components/HomePage/Landing/Landing';
import MyWork from './components/HomePage/MyWork/MyWork';
import AboutMe from './components/HomePage/AboutMe/AboutMe';
import Resume from './components/HomePage/Resume/Resume';
import Separator from './components/HomePage/Separator/Separator';

export default function Page() {
	return (
		<main>
			<Landing />
			<Separator />
			<AboutMe />
			<MyWork />
			<Resume />
		</main>
	);
};
