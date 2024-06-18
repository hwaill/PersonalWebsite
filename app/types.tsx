export type NavItem = {
	title: string;
	url: string;
	icon?: string;
	subNav?: boolean;
	subNavItems?: NavItem[];
	externalLink?: boolean;
	ignoreHighlight?: boolean;
};

export type Project = {
	heading: string;
	tags: string[];
	hook: string;
	description: string;
	imgUrl: string;
	imgStyle?: string;
	imgAltText?: string;
	linkUrl: string;
};

export type ProjectOutline = {
	bannerImgUrl: string;
	bannerImgStyle?: string;
	logoImgUrl: string;
	logoImgStyle?: string;
};

export type TeamCardData = {
	imgSrc: string;
	imgAltText?: string;
	name: string;
	desc: string;
	linkUrl?: string;
};