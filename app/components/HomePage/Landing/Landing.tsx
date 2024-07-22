import style from './landing.module.css';

export default function Landing() {
	return (
		<>
			<div className="landingContainer">
				<div className={style.tybaltHand}></div>
				<h1 className={"landing"}>Hello<span className="blueText">!</span></h1>
				<h4 className={"landing"}>My name is Henry Waill.</h4>
				<h4 className={"landing"}>I like making things that help people.</h4>
			</div>
		</>
	);
};