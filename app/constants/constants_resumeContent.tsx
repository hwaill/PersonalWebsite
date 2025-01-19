/* EDITABLE CONTENT */

import { RESUME_SIDEBAR_URL_TYPES, RESUME_SKILL_TYPE, ResumeSection, ResumeSidebarItem, ResumeSkillsSection } from "../types";

export const SIDEBAR_ITEMS : ResumeSidebarItem[] = [
	{
		icon: "location",
		text: "Denver, CO"
	},
	{
		icon: "linkedInNavy",
		text: "LinkedIn",
		url: "https://www.linkedin.com/in/henry-waill-b6228b69/",
		urlType: RESUME_SIDEBAR_URL_TYPES.EXTERNAL
	},
	{
		icon: "contactNavy",
		text: "Contact Me",
		url: "/contact/",
		urlType: RESUME_SIDEBAR_URL_TYPES.LOCAL
	}
]

export const RESUME_SECTIONS: ResumeSection[] = [{
	heading: "Education",
	items: [{
		org: "The University of Colorado Boulder",
		position: "Bachelor of Science Degree",
		location: "Boulder, CO",
		date: "May 2024",
		logoUrl: "/img/homepage/resume/logoCU.svg",
		descriptions: [
			"College of Engineering & Applied Science",
			"Major: Creative Technology and Design, Minor: Music",
			"Major GPA: 3.578, Overall GPA: 3.404"
		]
	}]
}, {
	heading: "Work Experience",
	items: [{
		org: "Bison Peak Logistics",
		position: "Amazon Delivery Associate",
		location: "Englewood, CO",
		date: "October 2024–Present",
		logoUrl: "/img/homepage/resume/logoBisonPeak.svg",
		descriptions: [
			"Efficiently organized and managed daily delivery routes, optimizing time and resources to ensure timely and accurate package delivery.",
			"Maintained a high level of customer satisfaction by providing professional, friendly service and addressing delivery concerns promptly.",
			"Adhered to safety protocols and company policies while operating vehicles and handling packages to minimize risk and ensure compliance."
		]
	},{
		org: "Nexplore",
		position: "Afterschool STEM Instructor",
		location: "Denver, CO",
		date: "September 2024–February 2025",
		logoUrl: "/img/homepage/resume/logoNexplore.svg",
		descriptions: [
			"Developed and delivered engaging STEM lessons and activities to students, fostering critical thinking and problem-solving skills in both English and Spanish.",
			"Provided individualized support to a diverse group of students, ensuring understanding and participation across varying skill levels."
		]
	},{
		org: "The University of Colorado Boulder",
		position: "Learning Assistant",
		location: "Boulder, CO",
		date: "Spring 2021, Fall 2023",
		logoUrl: "/img/homepage/resume/logoCU.svg",
		descriptions: [
			"Taught students principles of programming microcontrollers, designing and assembling circuits, modelling and fabricating physical enclosures.",
			"Adapted instruction to suit each student's self-directed independent projects."
		]
	},{
		org: "The Corner",
		position: "Assistant Manager, Cashier",
		location: "Boulder, CO",
		date: "July 2021–August 2024",
		logoUrl: "/img/homepage/resume/logoCorner.svg",
		descriptions: [
			"Oversee front and back-of-house operations in a popular, high-volume restaurant.",
			"Train and supervise team members to provide consistent customer service and food quality.",
			"Restructured point of sale backend to improve communication, reporting and ease of maintenance."
		]
	},{
		org: "McGuckin Hardware",
		position: "Cashier, Sales Associate",
		location: "Boulder, CO",
		date: "June 2018–March 2020",
		logoUrl: "/img/homepage/resume/logoMcguckins.svg",
		descriptions: [
			"Facilitated Point-Of-Sale transactions efficiently and courteously as a cashier.",
			"Maintained inventory, stocked displays and assisted customers with questions, needs and purchases as a sales associate."
		]
	}]
}, {
	heading: "Leadership Experience and Activities",
	items: [{
		org: "NOLS",
		position: "Expedition Member",
		location: "Nelson, New Zealand",
		date: "September 2016–December 2016",
		logoUrl: "/img/homepage/resume/logoNOLS.svg",
		descriptions: [
			"Demonstrated leadership and self-reliance living and travelling in the wilderness (90 days mountaineering, sea kayaking, backpacking.)",
			"Adapted to unpredictable environments.",
			"Elected by peers to lead group wilderness expedition without instructors.",
			"Earned Leave No Trace Master Educator Certification."
		]
	}]
}];

// Technical Skills: Soldering, 3D Printing, Laser Cutting, Intermediate PCB Design
// Design Skills: User Interface Design, Graphic Design (Digital and Print), 3D Modelling

export const SKILL_SECTION_CONTENT : ResumeSkillsSection = {
	heading: "Additional Information",
	subSections: [{
		categories: [{
			name: "Computer Skills",
			skills: [{
				name: "Web Development",
				type: RESUME_SKILL_TYPE.NUMBER_SCALE,
				numberValue: 4,
				description: "HTML, CSS/SASS, JavaScript, React, NextJS, MySQL"
			},{
				name: "Programming",
				type: RESUME_SKILL_TYPE.NUMBER_SCALE,
				numberValue: 3,
				description: "Java C++"
			},{
				name: "Adobe Creative Suite",
				type: RESUME_SKILL_TYPE.NUMBER_SCALE,
				numberValue: 5,
				description: "Photoshop, Illustrator, After Effects, Premiere Pro"
			},{
				name: "Computer-Aided Design (CAD)",
				type: RESUME_SKILL_TYPE.NUMBER_SCALE,
				numberValue: 4,
				description: "KiCad, OnShape, Rhino3D"
			}]
		},{
			name: "Technical Skills",
			skills: [{
				name: "Soldering",
				type: RESUME_SKILL_TYPE.NUMBER_SCALE,
				numberValue: 4
			},{
				name: "3D Printing",
				type: RESUME_SKILL_TYPE.NUMBER_SCALE,
				numberValue: 4
			},{
				name: "Laser Cutting",
				type: RESUME_SKILL_TYPE.NUMBER_SCALE,
				numberValue: 4
			},{
				name: "PCB Design",
				type: RESUME_SKILL_TYPE.NUMBER_SCALE,
				numberValue: 3
			}]
		},{
			name: "Design Skills",
			skills: [{
				name: "User Interface Design",
				type: RESUME_SKILL_TYPE.NUMBER_SCALE,
				numberValue: 3
			},{
				name: "Graphic Design",
				type: RESUME_SKILL_TYPE.NUMBER_SCALE,
				numberValue: 4,
				description: "Digital and print media"
			},{
				name: "3D Modelling",
				type: RESUME_SKILL_TYPE.NUMBER_SCALE,
				numberValue: 3
			}]
		}]
	},{
		categories: [{
			name: "Languages",
			skills: [{
				name: "Spanish",
				type: RESUME_SKILL_TYPE.WORD_SCALE,
				wordValue: "Conversational"
			}]
		},
		{
			name: "Interests",
			skills: [{
				name: "Piano and Music Production",
				type: RESUME_SKILL_TYPE.NO_VALUE
			},{
				name: "Rock Climbing",
				type: RESUME_SKILL_TYPE.NO_VALUE
			},{
				name: "Weaving",
				type: RESUME_SKILL_TYPE.NO_VALUE
			}, {
				name: "Mathematics",
				type: RESUME_SKILL_TYPE.NO_VALUE
			}]
		},{
			name: "Work Eligibility",
			type: RESUME_SKILL_TYPE.PHRASE,
			phraseValue: "Eligible to work in the U.S. with no restrictions."
		}]
	}]
}