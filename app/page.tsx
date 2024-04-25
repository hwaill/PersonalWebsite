import style from './page.module.css';
import Landing from './components/Landing/Landing';
import PageContent from './components/PageContent/PageContent';

export default function Home() {
	return (
		<main className={style.main}>
			<Landing />
			<PageContent />
		</main>
	);
}
