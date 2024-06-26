/* TYPES */

export enum URL_TYPES {
	EXTERNAL,
	LOCAL
};

export type SidebarItem = {
	icon: string;
	text: string;
	url?: string;
	urlType?: URL_TYPES;
};

export type Experience = {
	org: string;
	position: string;
	location: string;
	date: string;
	descriptions?: string[];
	logoUrl?: string;
};

export type ResumeSection = {
	heading: string;
	items: Experience[];
};

export const enum SKILL_TYPE {
	NUMBER_SCALE,
	WORD_SCALE,
	PHRASE,
	NO_VALUE
}

export type Skill = {
	name: string;
	type: SKILL_TYPE;
	numberValue?: number;
	wordValue?: string;
	phraseValue?: string;
}

export type SkillSubCategory = {
	name: string;
	skills?: Skill[];
	type?: SKILL_TYPE;
	numberValue?: number;
	wordValue?: string;
	phraseValue?: string;
}

export type SkillCategory = {
	name: string;
	subCategories?: SkillSubCategory[];
	skills?: Skill[];
	type?: SKILL_TYPE;
	numberValue?: number;
	wordValue?: string;
	phraseValue?: string;
}

export type SkillsSection = {
	heading: string;
	categories?: SkillCategory[];
}

/* EDITABLE CONTENT */

export const SIDEBAR_ITEMS : SidebarItem[] = [
	{
		icon: "location",
		text: "Denver, CO"
	},
	{
		icon: "linkedInNavy",
		text: "linkedIn",
		url: "https://www.linkedin.com/in/henry-waill-b6228b69/",
		urlType: URL_TYPES.EXTERNAL
	},
	{
		icon: "contactNavy",
		text: "Contact Me",
		url: "/contact/",
		urlType: URL_TYPES.LOCAL
	}
]

export const RESUME_SECTIONS: ResumeSection[] = [{
	heading: "Education",
	items: [{
		org: "The Univerisity of Colorado Boulder",
		position: "Bachelor of Science Degree",
		location: "Boulder, CO",
		date: "May 2024",
		logoUrl: "/img/homepage/resume/logoCU.svg",
		descriptions: [
			"College of Engineering & Applied Science",
			"Major: Creative Technology and Design, Minor: Music",
			"Major GPA: 3:578, Overall GPA: 3.404"
		]
	}]
}, {
	heading: "Work Experience",
	items: [{
		org: "The Univerisity of Colorado Boulder",
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
		position: "Shift Manager, Cashier",
		location: "Boulder, CO",
		date: "July 2021–Present",
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

export const SKILL_SECTION_CONTENT : SkillsSection = {
	heading: "Additional Information",
	categories: [{
		name: "Hard Skills",
		subCategories: []
	},
	{
		name: "Soft Skills",
		subCategories: []
	},
	{
		name: "Languages",
		skills: [{
			name: "Spanish",
			type: SKILL_TYPE.WORD_SCALE,
			wordValue: "Conversational"
		}]
	},
	{
		name: "Interests",
		skills: [{
			name: "Piano and Music Production",
			type: SKILL_TYPE.NO_VALUE
		},{
			name: "Rock Climbing",
			type: SKILL_TYPE.NO_VALUE
		},{
			name: "Weaving",
			type: SKILL_TYPE.NO_VALUE
		}, {
			name: "Mathematics",
			type: SKILL_TYPE.NO_VALUE
		}]
	},{
		name: "Work Eligibility",
		type: SKILL_TYPE.PHRASE,
		phraseValue: "Eligible to work in the U.S. with no restrictions."
	}]
}