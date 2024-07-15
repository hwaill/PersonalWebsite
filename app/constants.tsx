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
			{	title: "Motivations", url: "/henry/motivations", disabled: true},
			{ title: "Habits", url: "/henry/habits", disabled: true},
			{ title: "Blog", url: "/henry/blog", icon: "writing2", disabled: true},
			{ title: "Instagram", url: "https://www.instagram.com/henrywaill", icon: "instagram", externalLink: true}
		]
	}
];

export const PROJECTS: Project[] = [
	{
		heading: 'Todos Productivity Board',
		tags: [
			'robotics',
			'powered by arduino',
			'custom pcb',
			'wifi-enabled'
		],
		hook: 'A new way to build habits.',
		description: 'Improve task management for those who struggle with attention and executive function.',
		imgUrl: '/img/projects/todos/banner.jpg',
		imgStyle: '{"objectPosition":"15% center"}',
		imgAltText: 'Photo of Todos Productivty Board in action. Foreground shows front button panel with the Todos logo engraved. The robotic arm can be seen drawing on the whiteboard in the background.',
		linkUrl: '/projects/todos/',
		featured: true
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
		linkUrl: '/projects/macropad/',
		featured: true
	},{
		heading: 'The Sun Clock',
		tags: [
			'wifi-enabled',
			'laser-cut',
			'decor and lighting'
		],
		hook: 'Rise and set with the sun.',
		description: 'Minimalist aesthetic meets internet connectivity. The Sun Clock is functional decor that changes with the sun and the moon.',
		imgUrl: '/img/projects/sunClock/banner.jpg',
		imgStyle: '{"objectPosition":"8% center"}',
		imgAltText: 'Birdseye image shows the macropad 2040 keypad on a desk surface. It rests on its hand-sewn pouch, and extra keycaps lay scattered next to it.',
		linkUrl: '/projects/sunclock/',
		featured: true
	},{
		heading: 'This Website',
		tags: [
			'next.js',
			'mySQL',
			'responsive'
		],
		description: 'A personal website designed to further develop my brand.',
		imgUrl: '/img/projects/personalwebsite/banner.jpg',
		linkUrl: '/projects/personalsite/',
		featured: false,
		disabled: true
	},{
		heading: 'Controller Overlays',
		tags: [
			'graphic design',
			'animation',
			'entrepreneurship'
		],
		description: 'Designing custom, interactive graphics for streamers that honor their brands.',
		imgUrl: '/img/projects/controlleroverlays/banner.png',
		linkUrl: '/projects/controlleroverlays/',
		featured: false,
		disabled: true
	},{
		heading: 'BusToShow Announcements',
		tags: [
			'established brand',
			'graphic design',
			'marketing'
		],
		description: 'Working with a nonprofit to develop new marketing material.',
		imgUrl: '/img/projects/bustoshow/banner.png',
		linkUrl: '/projects/bustoshow/',
		featured: false,
		disabled: true
	},{
		heading: 'Experiments with Textiles',
		tags: [
			'weaving',
			'wearable technology'
		],
		description: 'An ongoing exploration into the world of weaving, both experimental and traditional.',
		imgUrl: '/img/projects/textiles/banner.JPG',
		linkUrl: '/projects/textiles/',
		featured: false,
		disabled: true
	},{
		heading: 'Drawing Machine V1',
		tags: [
			'robotics',
			'powered by arduino'
		],
		description: 'A first attempt at designing a CNC plotter from the ground up.',
		imgUrl: '/img/projects/drawingmachine/banner.JPG',
		linkUrl: '/projects/drawingmachine/',
		featured: false,
		disabled: true
	},{
		heading: 'Experiments with Generative Art',
		tags: [
			'Processing',
			'p5.js',
			'creative'
		],
		description: 'A personal endeavor to emulate nature through code.',
		imgUrl: '/img/projects/generativeart/banner.png',
		linkUrl: '/projects/generativeart/',
		featured: false,
		disabled: true
	}
];