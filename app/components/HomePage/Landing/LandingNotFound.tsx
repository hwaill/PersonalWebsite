import style from './landing.module.css';

export default function LandingNotFound() {
	return (
		<>
			<div className={style.notFoundContainer}>
				<div className={style.tybaltHand2}></div>
				<div className={style.notFoundText}>
					<h1>Woah<span className="coralText">!</span></h1>
					<h6 className={"subtitle"}>Error 404: Page not found.</h6>
				</div>
			</div>
		</>
	);
};