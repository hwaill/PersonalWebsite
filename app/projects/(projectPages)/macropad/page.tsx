import React from 'react'
import { Metadata } from 'next'
import { ProjectOutline } from '@/app/types'
import { ProjectSection, ProjectSubSection, ProjectParagraph }from '@/app/components/Projects/ProjectPageContent/ProjectSections'
import { ProjectVideoFull } from '@/app/components/Projects/ProjectPageContent/ProjectVideos'
import { ProjectImageBanner, ProjectImage, ProjectImageFull, ProjectImageHalf } from '@/app/components/Projects/ProjectPageContent/ProjectImages'

export const metadata : Metadata = {
	title: "Macropad 2040"
};

const PROJECT_DATA: ProjectOutline = {
	bannerImgUrl: "/img/projects/macropad/banner2.jpg",
	bannerImgStyle: '{"backgroundPosition":"center 81%"}',
	logoImgUrl: "/img/projects/macropad/logoWhite.svg",
	logoImgStyle: '{"height":"2.5rem"}'
}

export default function Page() {
	return (
		<>
			<ProjectImageBanner data={PROJECT_DATA} />
			<ProjectSection heading="Project Overview">
				<ProjectParagraph><em>Macropad 2040</em> is a productivity tool that allows people who work at their computers to improve the efficiency of their workflows. It is a simple 4x4 keyboard with two rotary encoders, but the opportunities for customization are endless. Each key can be bound to frequently-used software commands, and multiple layers of commands can be programmed for use in different situations or with different applications. Keycaps and switches can be easily swapped out, allowing for a deeper level of individuality to be achieved.</ProjectParagraph>
				<ProjectImageHalf src="/img/projects/macropad/banner.jpg" alt="Birdseye image shows the macropad 2040 keypad on a desk surface. It rests on its hand-sewn pouch, and extra keycaps lay scattered next to it." right={true} />
				<ProjectParagraph>A macro pad like this is not a novel device. In fact, it seems that they are becoming more and more popular in recent years; they&apos;re certainly becoming more available. The goal of this project was not to create something new, but to instead practice and refine my own skills. I aimed to create a product that was easily reproducable, of a decent build quality and easy enough to use that I could at least gift them to friends without reservation. I wanted to create something that was more a product than a university project.</ProjectParagraph>
				<ProjectParagraph>Below, find the demo video for <em>Macropad 2040</em>.</ProjectParagraph>
			</ProjectSection>
			<ProjectVideoFull url="https://www.itsshreeyo.com/hwhosting/macropadVideo.mp4" type="video/mp4" />
			<ProjectSection heading="Project Breakdown">
				<ProjectSubSection heading="At a glance...">
					<ProjectParagraph>The journey to bring <em>Macropad 2040</em> from an idea to a physical product can be split into a few big efforts: the circuitry, the enclosure and the end-user experience. From designing a custom microcontroller based on the RP2040 chip designed by <em>Raspberry Pi</em>, to experimenting with different sound insulation techniques to improve the overall tactile experience, there were many aspects of the process that took me outside my comfort zone. Each of the five prototypes even comes in a hand-sewn bag (with mistakes I&apos;ve tactically excluded from all of the images I&apos;ve taken of them.)</ProjectParagraph>
					<ProjectImageFull src="/img/projects/macropad/img2.jpg" alt="All components needed to construct the macropad are laid out neatly on a desk." />
				</ProjectSubSection>
				<ProjectSubSection heading="The Circuitry">
					<ProjectParagraph>All of my prior electronics projects have been designed around pre-existing microcontrollers, like <em>Arduinos</em> and other similar devices. These are great for experimentation, and many of my own have even taken up full-time positions as the brain of other projects. One obvious drawback, however, is that incorporating them into these devices requires a minimum amount of space and requires the form factor of the final enclosure to be influenced by another product&apos;s physical design. Additionally, the connections made to these hobbyist microcontrollers tend to be less permanent and messier. Because of this, I opted to design my own circuit board.</ProjectParagraph>
					<ProjectImageFull src="/img/projects/macropad/img3.jpg" alt="Close-up view of the custom microcontroller PCB."/>
					<ProjectParagraph>In the interest of full-disclosure, I&apos;ll mention that I wasn&apos;t starting completely from scratch. A specific microcontroller unit, the <a target="_blank" rel="noopener noreferrer" href="https://www.raspberrypi.com/products/rp2040/"><em>RP2040 by Raspberry Pi</em></a> was an obvious choice to design around. This was not only because of its popularity in the keyboard making community (usually in the form of a complete board  like <a target="_blank" rel="noopener noreferrer" href="https://www.adafruit.com/product/5302?gad_source=1&gclid=CjwKCAjw3NyxBhBmEiwAyofDYX8Bz66vOyGbhr_bf1PwqLWBVxbG1mG-2bmBpMJ42_OgXAE_om01yhoCOdQQAvD_BwE">this one</a> from <em>Adafruit</em>, <a target="_blank" rel="noopener noreferrer" href="https://www.seeedstudio.com/XIAO-RP2040-v1-0-p-5026.html?gad_source=1&gclid=CjwKCAjw3NyxBhBmEiwAyofDYeZw4nCniQkxYJ-yrHYOTPgoE7aTatfTuJNyYz2sH_Qk8YoX_OerxhoCxc8QAvD_BwE">this one</a> from <em>Seeed Studio</em> or <a target="_blank" rel="noopener noreferrer" href="https://www.raspberrypi.com/products/raspberry-pi-pico/">this one</a> from <em>Raspberry Pi</em> themselves.) The more convincing argument for this chip is the quality of documentation provided for it. <em>Raspberry Pi</em> provides both thorough <a target="_blank" rel="noopener noreferrer" href="https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf?_gl=1*v0p65l*_ga*MjU0NDUzNzI5LjE3MTQ5MjgzMTQ.*_ga_22FD70LWDS*MTcxNDkyODMxNC4xLjEuMTcxNDkzMDM5MS4wLjAuMA..">technical documentation</a> for this chip, as well as a <a target="_blank" rel="noopener noreferrer" href="https://datasheets.raspberrypi.com/rp2040/hardware-design-with-rp2040.pdf?_gl=1*v0p65l*_ga*MjU0NDUzNzI5LjE3MTQ5MjgzMTQ.*_ga_22FD70LWDS*MTcxNDkyODMxNC4xLjEuMTcxNDkzMDM5MS4wLjAuMA..">hardware design guide</a> to help those doing what I hoped to do.</ProjectParagraph>
					<ProjectParagraph>I designed the board to support 16 hot-swappable keyboard switches (the footprints are standardized,) two rotary-encoders with push-buttons, 16 addressable RGB LEDs as well as a header to add more if needed, and a header for a OLED display for future flexibility. I had my design fabricated by <a target="_blank" rel="noopener noreferrer" href="https://jlcpcb.com/"><em>JLCPCB</em></a>, realized I had made a terrible design error and then had my new designs fabricated.</ProjectParagraph>
					<ProjectImageHalf src="/img/projects/macropad/img6.jpg" alt="Close-up view of the printed circuit board shows a large screenprinted logo and hot-swap sockets for key switches." right={true} />
					<ProjectParagraph>Without easy access to advanced soldering tools like a reflow oven, I opted to have <em>JLCPCB</em> assemble most of the components onto the board. The only remaining soldering was of the rotary encoders and the hot-swap sockets. In what felt like a miraculous turn of events, all five boards turned on without a hiccup!</ProjectParagraph>
				</ProjectSubSection>
				<ProjectSubSection heading="The Enclosure">
					<ProjectParagraph>My goals for the design of the enclosure were not too demanding. Aesthetically speaking, I wanted to have a design that showcased the circuit board in all of its glory. Second, I wanted to do my best to make the sound of the keyboard switches as satisfying as I could.</ProjectParagraph>
					<ProjectImageHalf src="/img/projects/macropad/img4.jpg" alt="Different angle of some internal components of the build. Foam layers, hardware and some 3D-printed parts can be seen on a desk surface." left={true} />
					<ProjectParagraph>The desire to show off the circuitry of the build influenced the overall design and made my job a bit easier, to be honest. Exposed screw heads added to the visual appeal, in my opinion, and didn&apos;t have to be hidden in difficult-to-access locations.</ProjectParagraph>
					<ProjectParagraph>The majority of the enclosure was fabricated out of PLA with 3D printers that I had access to, and the foam inserts were laser-cut to shape and size out of EVA foam. These rapid-prototyping tools were crucial in making the iterative design process convenient. With the design functional, I&apos;m interested in expanding my horizons and looking towards more advanced production techniques. A solid wood or aluminum construction would take this product to the next level, but feels outside of my current capabilities.</ProjectParagraph>
					<ProjectImageHalf src="/img/projects/macropad/img5.jpg" alt="Close-up view of the keyboard switches and key caps." right={true} />
					<ProjectParagraph>Working towards my second goal of make keystrokes sound nice was not so simple. I am not mechanical keyboard enthusiast, so I wasn&apos;t sure I would even know what success sounded like had I achieved it. I made what amounted to a series of educated guesses and I think the end result is decent enough! I added EVA foam within the case and between the PCB and the switch plate, which made a noticeable difference. I also attempted to gasket-mount the PCB to the case to absorb vibrations. This did <em>not</em> make a noticeable different, likely because I didn&apos;t use ideal materials and the bottom of the PCB rests on the EVA floor already. Alas! Lastly, I abandoned my initial effort of fabricating my own keycaps and opted to buy some more legitimate ones along with the switches I purchased. The feel and sound of the end result is nice by my standards! I don&apos;t have a microphone worthy enough to record a sample.</ProjectParagraph>
				</ProjectSubSection>
				<ProjectSubSection heading="The End-User Experience">
					<ProjectParagraph>When I set out to work on this product, making it easily usable and understandable was a high priority. The primary motivation for this was my desire to give the extra four (<em>JLCPCB</em>&apos;s minimum order quantity is five) macropads to friends and mentors on mine. In terms of software/firmware, I did my best to make everything accessible by utilizing a common custom keyboard firmware called <em>QMK</em>. However, without writing custom configuration software, it is hard to spare the user from some pretty involved setup to be able to tune the functionality. Luckily, the installation of new firmware is quite simple, so I can make changes and send updates as needed. Difficult at scale, of course, but manageable for a few friends.</ProjectParagraph>
					<ProjectImageFull src="/img/projects/macropad/img1.jpg" alt="The macropad's hand-sewn and branded drawstring pouch sits on a desktop." />
					<ProjectParagraph>The unboxing experience was the final aspect of the product that I wanted to put some thought into, and I found an opportunity to hone my sewing skills, which are certainly underdeveloped. I chose to hand-sew some drawstring bags for each <em>Macropad2040</em>, and I chose some fabrics that had sentimental value to me. Inside, I also provided some extra keycaps so that each recipient could further tailor the experience to their preferences.</ProjectParagraph>
				</ProjectSubSection>
			</ProjectSection>
		</>
	)
}