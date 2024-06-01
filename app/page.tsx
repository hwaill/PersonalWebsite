import Landing from './components/HomePageContent/Landing/Landing';
import MyWork from './components/HomePageContent/MyWork/MyWork';
import AboutMe from './components/HomePageContent/AboutMe/AboutMe';

export default function Home() {
	return (
		<main>
			<Landing />
			<div className="shiftUp"><AboutMe /></div>
			<MyWork />
		</main>
	);
};
