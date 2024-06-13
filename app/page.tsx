import Landing from './components/HomePage/Landing/Landing';
import MyWork from './components/HomePage/MyWork/MyWork';
import AboutMe from './components/HomePage/AboutMe/AboutMe';
import Resume from './components/HomePageContent/Resume/Resume';
import Navigation from './components/Navigation/Navigation';
import Separator from './components/HomePage/Separator/Separator';

export default function Home() {
	return (
		<main>
			<Landing />
			<Separator />
			<AboutMe />
			<MyWork />
			{/* <Resume /> */}
		</main>
	);
};
