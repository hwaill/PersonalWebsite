import style from "./resume.module.css"

export default function Resume() {
	return (
		<div className="homePageSection">
			<h2 className="greenText">My resume</h2>
			<p>Here&apos;s a pretty one! <a href='assets/HenryWaill_2024_06_10_Resume.pdf' download>Here</a>&apos;s the ugly one I&apos;m told AI can read...</p>
		</div>
	);
};

function ResumeContent() {
	return (
		<></>
	);
};