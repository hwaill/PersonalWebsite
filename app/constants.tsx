import { NavItem, Project } from "./types";

export const NAV_ITEMS: NavItem[] = [
	{
		title: "Home",
		url: "/",
		ignoreHighlight: true,
	},
	{
		title: "My Projects",
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
		title: "My Resume",
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
		title: "Contact Me",
		url: "/contact",
		icon: "mail2"
	},
	{
		title: "Henry",
		url: "/henry",
		icon: "user",
		subNav: true,
		subNavItems: [
			{	title: "Motivations", url: "/henry/motivations"},
			{ title: "Habits", url: "/henry/habits" },
			{ title: "Blog", url: "/henry/blog", icon: "writing2" },
			{ title: "Instagram", url: "https://www.instagram.com/henrywaill", icon: "instagram", externalLink: true}
		]
	}
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
		linkUrl: '/projects/todos/'
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
	},{
		heading: 'The Sun Clock',
		tags: [
			'wifi-enabled',
			'laser-cut',
			'decor and lighting'
		],
		hook: 'A faster workflow at your fingertips.',
		description: 'A customizable desk gadget that extends the functionality of a traditional computer keyboard.',
		imgUrl: '/img/projects/sunClock/banner.jpg',
		imgAltText: 'Birdseye image shows the macropad 2040 keypad on a desk surface. It rests on its hand-sewn pouch, and extra keycaps lay scattered next to it.',
		linkUrl: '/projects/sunclock/'
	}
];
