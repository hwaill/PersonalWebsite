import { ProjectImageBanner, ProjectImageCollage, ProjectImageCollageTriple, ProjectImageFull, ProjectImageHalf, ProjectImageThird } from '@/app/components/Projects/ProjectPageContent/ProjectImages';
import { ProjectParagraph, ProjectSection, ProjectSectionContinue, ProjectSubSection, ProjectSubSectionContinue } from '@/app/components/Projects/ProjectPageContent/ProjectSections';
import { ProjectVideoFull } from '@/app/components/Projects/ProjectPageContent/ProjectVideos';
import { ProjectOutline } from '@/app/types';
import { Metadata } from 'next'
import Link from 'next/link';
import React from 'react'

export const metadata : Metadata = {
	title: "Sun Clock",
};

const PROJECT_DATA: ProjectOutline = {
	bannerImgUrl: "/img/projects/thesunclock/banner.jpg",
	bannerImgStyle: '{"objectPosition":"8% center"}',
	logoImgUrl: "/img/projects/thesunclock/logoWhite.svg",
	logoImgStyle: '{"height":"8em"}'
};

export default function Page() {
	return (
		<>
			<ProjectImageBanner data={PROJECT_DATA} />
			<ProjectSection heading="Project Overview">
				<ProjectParagraph><em>The Sun Clock</em> is wall decor that changes appearance to display the rising and setting of the sun each day. WiFi connectivity allows for the retrieval of up-to-date sunrise and sunset data to create accurate visual representions of the transitions between day and night, no matter the time zone, latitude or longitude.</ProjectParagraph>
				<ProjectParagraph>In addition to this core feature, <em>The Sun Clock</em> can display the time of day through an analog-clock-esque display. Alternatively, users can opt to use the device solely for decorative purposes through one of the multiple accent light settings.</ProjectParagraph>
				<ProjectParagraph>A demo video for the project is in the works, so check back soon to see!</ProjectParagraph>
				{/* <ProjectParagraph>Below, find the demo video for <em>The Sun Clock</em>.</ProjectParagraph> */}
			</ProjectSection>
			{/* <ProjectVideoFull url="https://www.itsshreeyo.com/hwhosting/todosVideo.mp4" type="video/mp4" posterUrl="/img/projects/todos/videoThumbnail.png" /> */}
			<ProjectSection heading="Project Breakdown">
				<ProjectSubSection heading="At a glance...">
					<ProjectImageHalf src="/img/projects/thesunclock/img1.jpg" alt="The Sun Clock is seen hanging on a wall, glowing from behind with a warm, white light." right={true} />
					<ProjectParagraph>This project served as the final project for <em>Object</em>, an undergraduate physical computing class at the University of Colorado, Boulder. The class focused on programming microcontrollers, fabricating enclosures and creating interactive systems to solve problems.</ProjectParagraph>
					<ProjectParagraph>The trajectory of this specific project strayed from the initial goal of emphasizing user interaction in favor of a more practical outcome; I wanted something that I would be happy to hang up in my apartment long after the novelty wore off.</ProjectParagraph>
				</ProjectSubSection>
				<ProjectSubSection heading="The Construction">
					<ProjectImageHalf src="/img/projects/thesunclock/sketch1.jpg" alt="Inital, rough sketch of the intended design." right={true} />
					<ProjectParagraph>At the time of writing this, all that is left of the initial sketching phase is the poor-quality pencil drawing seen here. There were a few other designs that were considered, but the the simplicity and smoothness of the shapes felt the most pleasant. The vision for <em>The Sun Clock</em> was to have a flat, sun-shaped silhouette that was backlit by wall-facing LEDs. The desired flat design influenced the choice of materials, plywood. The plywood influenced the choice of manufacturing techniques, laser-cutting.</ProjectParagraph>
					<ProjectImageHalf src="/img/projects/thesunclock/render1.png" alt="Render of the final model hanging on a wall." right={true} imgStyle='{"aspectRatio":"8 / 5"}'/>
					<ProjectParagraph>With all this in mind (and a vision for the required circuitry, explained below,) modelling began. Most of the pieces are made of two layers of plywood in order to easily create channels for running wiring and placing LEDs. The space behind the central circle of the &quot;sun&quot; was used to contain the bulk of the hardware, including the power supply and microcontroller circuit.</ProjectParagraph>
					<ProjectParagraph>After iterating over the design, the parts were sent to the laser-cutter to begin the the fabrication process. From there, all that was needed was some sanding, some painting and some gluing together to finish constructing the piece.</ProjectParagraph>
				</ProjectSubSection>
			</ProjectSection>
			<ProjectImageCollage
				src1="/img/projects/thesunclock/laserCut1.jpg"
				src2="/img/projects/thesunclock/build1.jpg"
				alt1="A sheet of plywood is laying in a laser-cutter bed after being cut."
				alt2="The laser-cut pieces, now painted white, are being tested for fit. Many components are shown strewn across the table."
				weight1={1}
				weight2={1}
			/>
			<ProjectSectionContinue>
				<ProjectSubSection heading="The Circuitry">
					<ProjectParagraph>At it&apos;s core, the electronics for this project did not need to be very complicated. A WiFi-enabled microcontroller (in this case, <em>Adafruit</em>&apos;s <Link href="https://www.adafruit.com/product/2821" target="_blank" rel="noopener noreferrer">Feather HUZZAH with ESP8266</Link>) needed to control some addressable LEDs. This particular setup added a few complications...: The number of LEDs in use, as well as the brightness at which I wanted to use them, required more power than the HUZZAH was able to provide. Additionally, the HUZZAH operates at a different voltage than the addressable LEDs prefer. These two considerations needed to be addressed.</ProjectParagraph>
				</ProjectSubSection>
			</ProjectSectionContinue>
			<ProjectImageFull src="/img/projects/thesunclock/circuitry2.jpg" alt="The internal circuitry can be see after the center face of the sun is removed." />
			<ProjectSectionContinue>
				<ProjectSubSectionContinue>
					<ProjectParagraph>The above picture shows the final state of the circuitry, and I will soon update this page with a schematic of the circuit for ease of viewing. In summary, <em>The Sun Clock</em> is powered externally from a 5V DC power supply. The lower-voltage logic signals from the Feather HUZZAH are converted to 5V using a <em>Logic Level Shifter</em>. Finally, the buttons and switches on the outside of the enclosure are wired to the microcontroller, and the addressable LEDs are connected in a long chain.</ProjectParagraph>
					<ProjectImageThird src="/img/projects/thesunclock/build2.jpg" alt="The back of the Sun Clock reveals the wiring of LEDs throughout." left={true} />
					<ProjectParagraph>All of the soldering was done by hand on a protoboard; A custom PCB design would certainly allow for a more compact and organized layout, but a protoboard was sufficient for the first iteration of the product. The main inconvenience of the project was soldering the long chain of LEDs together. Each required six connections, and most needed to be soldered in their final positions, which substantially limited maneuverability. Not all of the cable management was done perfectly, and a priority for a second iteration of the process would be to improve and simplify these connections.</ProjectParagraph>
				</ProjectSubSectionContinue>
				<ProjectSubSection heading="The Software">
					<ProjectImageHalf src="/img/projects/thesunclock/img3.jpg" right={true} alt="The Sun Clock in party mode is backlight with rainbow colors." />
					<ProjectParagraph>After ensuring that the single diode I employed to protect my computer from destruction was facing the correct direction, it was time to get working on programming the behavior of the LEDs.</ProjectParagraph>
					<ProjectParagraph>This process was enjoyable and allowed for a lot of creative expression. After successfully retrieving sunrise and sunset times from a weather API, I was left to be an animator! Mapping the chain of LEDs to its position in space made room for trigonometry to shine, and Perlin noise did a lot of heavy lifting as well.</ProjectParagraph>
				</ProjectSubSection>
			</ProjectSectionContinue>
		</>
	);
};