export type NavItem = {
	title: string;
	url: string;
	icon?: string;
	subNav?: boolean;
	subNavItems?: NavItem[];
	externalLink?: boolean;
	ignoreHighlight?: boolean;
}

export type Project = {
	heading: string;
	tags: string[];
	hook: string;
	description: string;
	imgUrl: string;
	imgStyle: string;
	linkUrl: string;
}