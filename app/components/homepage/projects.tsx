export default function Projects() {
	return (
		<div className="pageSection">
			<h1>Some of My Work</h1>
			<p>I think I&apos;m a really likable guy! On the rare occasion, I&apos;ve even been told I&apos;m funny and intelligent... but you will learn none of that from the following paragraphs.</p>
			<Project />
			<Project />
			<Project />
		</div>
	);
};

function Project() {
	return (
		<div className="projectContainer">
			<div className="projectContainerSpacer"></div>
			<div className="projectContainerNumber">01</div>
			<div className="projectContainerText">
				<h3>The Sun Clock</h3>
				<h4>Rise and set with the sun.</h4>
				<p>Minimalist aesthetic meets internet connectivity. The Sun Clock is functional decor that changes with the sun and the moon.</p>
			</div>
			<div className="projectContainerImage">
				<img src="/img/projects/thesunclock/icon.svg" />
			</div>
			<div className="projectContainerArrow"></div>
		</div>
	)
}