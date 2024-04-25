import style from './page.module.css';
import Landing from './components/Landing/Landing';
import HomePageContent from './components/HomePageContent/HomePageContent';

export default function Home() {
	return (
		<main className={style.main}>
			<Landing />
			<HomePageContent />
		</main>
	);
}
