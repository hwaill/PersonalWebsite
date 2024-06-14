import { Metadata } from 'next';

import style from './components/HomePage/Landing/landing.module.css';

export const metadata : Metadata = {
	title: "Page not found",
};

export default function NotFound() {
	return (
		<main>
			<div className="notFoundContainer">
				<div className={style.tybaltHand2}></div>
				<div className={style.notFoundText}>
					<h1>Woah<span className="coralText">!</span></h1>
					<h6 className={"subtitle"}>Error 404: Page not found.</h6>
				</div>
			</div>
		</main>
	);
};