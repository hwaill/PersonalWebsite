import { NavItem, Project, TeamCardData } from "./types";

export const NAV_ITEMS: NavItem[] = [
	{
		title: "Home",
		url: "/",
		ignoreHighlight: true,
	},
	{
		title: "My work",
		url: "/projects",
		icon: "briefcase",
		subNav: true,
		subNavItems: [
			{ title: "All", url: "/projects", ignoreHighlight: true},
			{ title: "Todos", url: "/projects/todos"},
			{ title: "Macropad 2040", url: "/projects/macropad"},
			{ title: "Sun Clock", url: "/projects/sunclock"}
		]
	},
	{
		title: "Contact me",
		url: "/contact",
		icon: "mail"
	},
	{
		title: "Blog",
		url: "/blog",
		icon: "writing"
	},
	{
		title: "My resume",
		url: "/resume",
		icon: "gradCap"
	},
	{
		title: "LinkedIn",
		url: "https://www.linkedin.com/in/henry-waill-b6228b69/",
		icon: "linkedIn",
		externalLink: true
	},
	{
		title: "Instagram",
		url: "https://www.instagram.com/henrywaill",
		icon: "instagram",
		externalLink: true
	},
];

export const PROJECTS: Project[] = [
	{
		heading: 'Todos Productivity Board',
		tags: [
			'robotics',
			'arduino',
			'custom pcb'
		],
		hook: 'A new way to build habits.',
		description: 'Improve task management for those who struggle with attention and executive function.',
		imgUrl: '/img/projects/todos/banner.jpg',
		imgStyle: '{"objectPosition":"15% center"}',
		imgAltText: 'Photo of Todos Productivty Board in action. Foreground shows front button panel with the Todos logo engraved. The robotic arm can be seen drawing on the whiteboard in the background.',
		linkUrl: '/projects/productivityboard/'
	},{
		heading: 'Macropad 2040',
		tags: [
			'custom pcb',
			'product-ready'
		],
		hook: 'A faster workflow at your fingertips.',
		description: 'A customizable desk gadget that extends the functionality of a traditional computer keyboard.',
		imgUrl: '/img/projects/macropad/banner.jpg',
		imgStyle: '{"objectPosition":"53% center"}',
		imgAltText: 'Birdseye image shows the macropad 2040 keypad on a desk surface. It rests on its hand-sewn pouch, and extra keycaps lay scattered next to it.',
		linkUrl: '/projects/macropad/'
	},
];



//Specific-to-project data
export const PROJECT_TODOS_TEAM_CARD_DATA: TeamCardData[] = [
	{
		imgSrc: "/img/projects/todos/henry.jpg",
		imgAltText: "Photo of Henry",
		name: "Henry Waill",
		desc: "Hardware Design, Software Engineering"
	},
	{
		imgSrc: "/img/projects/todos/jason.jpg",
		imgAltText: "Photo of Jason",
		name: "Jason Fontillas",
		desc: "User Experience Design"
	},
	{
		imgSrc: "/img/projects/todos/sydney.jpg",
		imgAltText: "Photo of Sydney",
		name: "Sydney Calcagno",
		desc: "User Interface Design"
	}
];