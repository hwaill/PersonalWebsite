import { NavItem, Project } from "./types";

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
		title: "My LinkedIn",
		url: "https://www.linkedin.com/in/henry-waill-b6228b69/",
		icon: "linkedIn",
		externalLink: true
	},
	{
		title: "My Instagram",
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
		linkUrl: '/projects/macropad/'
	},
];