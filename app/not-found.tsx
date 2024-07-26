import { Metadata } from 'next';
import LandingNotFound from './components/HomePage/Landing/LandingNotFound';

export const metadata : Metadata = {
	title: "Page not found",
};

export default function NotFound() {
	return (
		<main>
			<LandingNotFound />
		</main>
	);
};