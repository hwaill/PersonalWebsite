import Landing from './components/HomePageContent/Landing/Landing';
import MyWork from './components/HomePageContent/MyWork/MyWork';
import AboutMe from './components/HomePageContent/AboutMe/AboutMe';
import Resume from './components/HomePageContent/Resume/Resume';

export default function Home() {
	return (
		<main>
			<Landing />
			<div className="shiftUp"><AboutMe /></div>
			<MyWork />
			<Resume />
		</main>
	);
};
