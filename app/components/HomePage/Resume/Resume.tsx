export default function Resume() {
	return (
		<div className="homePageSection">
			<h2 className="greenText">My resume</h2>
			<div className="resumeContent">
				<div className="resumeText">
					<p>Here you&apos;ll find a difficult-to-read image of my resume that is soon to be replaced. Feel free to download a higher-quality version.</p>
					<div className="resumeButtonContainer"><a href='assets/HenryWaill_2024_06_10_Resume.pdf' download className="button">Download <div className="buttonIcon" style={{ WebkitMaskImage: 'url(/img/flaticon/arrow-right.svg)', maskImage: 'url(/img/flaticon/arrow-right.svg)' }}></div></a></div>
					</div>
				<div className="resumeImageContainer neu">
					<img src="/img/homepage/resume.jpg" alt="" className="resume" />
				</div>
			</div>
		</div>
	);
};