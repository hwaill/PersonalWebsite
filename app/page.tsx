import styles from './page.module.css';
import Landing from './components/Landing/Landing';

export default function Home() {
	return (
		<main className={styles.main}>
			<Landing />
			<div className={styles.weavingTest}></div>
		</main>
	);
}
