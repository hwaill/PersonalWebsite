import { ProjectImageBanner, ProjectImageFull, ProjectImageHalf } from "@/app/components/Projects/ProjectPageContent/ProjectImages";
import { ProjectParagraph, ProjectSection, ProjectSectionContinue, ProjectSubSection, ProjectSubSectionContinue } from "@/app/components/Projects/ProjectPageContent/ProjectSections";
import { ProjectOutline } from "@/app/types";
import { Metadata } from "next";
import Link from "next/link";

export const metadata : Metadata = {
	title: "Controller Overlays"
}

const PROJECT_DATA : ProjectOutline = {
	bannerImgUrl: "/img/projects/controlleroverlays/banner.png",
	logoImgUrl: "",
	logoText: "Controller Overlays"
}

export default function Page() {
	return (
		<>
			<ProjectImageBanner data={PROJECT_DATA} />
			<ProjectSection heading="Project Overview">
				<ProjectParagraph>Before I talk about my work, I&apos;ll give a little context to what a <em>controller overlay</em> is, as I understand they live in a pretty niche market. In the world of livestreaming on the internet, there is a large population of creators that stream video game gameplay. It is quite popular, and was especially so during the COVID-19 pandemic. Many of these creators play games with a handheld controller, and some opt to display a visual representation of the controller on their livestreams so that viewers can see what the streamer is doing in real time.</ProjectParagraph>
				<ProjectImageHalf right={true} src="/img/projects/controlleroverlays/gpv.png"></ProjectImageHalf>
				<ProjectParagraph>The most popular tool to accomplish this is called <Link href="https://gamepadviewer.com/">Gamepad Viewer</Link>, and pictured here is an example of a default controller overlay. It is plenty functional, but has a generic design. Many streamers have established branding and high-production-value content, so there was an opportunity for designers to create custom overlays for these individuals and groups.</ProjectParagraph>
				<ProjectParagraph>In December of 2020, I began creating these overlays as a freelance designer. I began with some overlays for friends and acquaintances, and then went on to sell them through Fiverr. The initial attempts left a lot to be desired, but developing my craft and tools soon made me a well-recommended designer in the space. I went on to design hundreds of these controller overlays, some for professional ESports players and ESports organizations.</ProjectParagraph>
			</ProjectSection>
			<ProjectSection heading="Gallery">
				<ProjectParagraph>If I did it right, the details of how this project came to be shouldn&apos;t be as interesting as the end result, but I&apos;ll give a brief summary.</ProjectParagraph>
				<ProjectSubSection heading="Behind the Scenes">
					<ProjectParagraph>This website is built on <Link href="https://nextjs.org/">Next.js</Link>, which is built on <Link href="https://react.dev/">React</Link>..., and that is pretty much it! I use raw CSS and spent much of my time googling the same flexbox cheat sheet over and over to make it look the way it does. I may have used an animation library somewhere along the line for my navigation menu on mobile.</ProjectParagraph>
					<ProjectParagraph>For my contact form, I use <Link href="https://www.nodemailer.com/">Nodemailer</Link> to send myself emails from my own email account. It is rarely used, but it is <em>ready</em>. Finally, my magnum opus that will never see the light of day because I keep forgetting to work on it: my habits dashboard!</ProjectParagraph>
				</ProjectSubSection>
			</ProjectSection>
		</>
	)
}