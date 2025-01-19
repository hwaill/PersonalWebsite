export type NavItem = {
	title: string;
	url: string;
	icon?: string;
	subNav?: boolean;
	subNavItems?: NavItem[];
	externalLink?: boolean;
	ignoreHighlight?: boolean;
	disabled?: boolean;
};

export type Project = {
	heading: string;
	tags: string[];
	hook?: string;
	description: string;
	imgUrl: string;
	imgStyle?: string;
	imgAltText?: string;
	linkUrl: string;
	featured: boolean;
	disabled?: boolean;
};

export type ProjectOutline = {
	bannerImgUrl: string;
	bannerImgStyle?: string;
	logoImgUrl?: string;
	logoImgStyle?: string;
	logoText?: string;
};

export type TeamCardData = {
	imgSrc: string;
	imgAltText?: string;
	name: string;
	desc: string;
	linkUrl?: string;
};

export type EmailData = {
	name: string;
	email: string;
	message: string;
};

export type HabitDashboardParameters = {
	view: string;
	startingDate: string;
	endingDate: string;
}

// Types related to resume content

export enum RESUME_SIDEBAR_URL_TYPES {
	EXTERNAL,
	LOCAL
};

export type ResumeSidebarItem = {
	icon: string;
	text: string;
	url?: string;
	urlType?: RESUME_SIDEBAR_URL_TYPES;
};

export type ResumeExperience = {
	org: string;
	position: string;
	location: string;
	date: string;
	descriptions?: string[];
	logoUrl?: string;
	logo2Url?: string;
};

export type ResumeSection = {
	heading: string;
	items: ResumeExperience[];
};

export const enum RESUME_SKILL_TYPE {
	NUMBER_SCALE,
	WORD_SCALE,
	PHRASE,
	NO_VALUE
}

export type ResumeSkill = {
	name: string;
	description?: string;
	type: RESUME_SKILL_TYPE;
	numberValue?: number;
	wordValue?: string;
	phraseValue?: string;
}

export type ResumeSkillCategory = {
	name: string;
	subCategories?: ResumeSkillCategory[];
	skills?: ResumeSkill[];
	type?: RESUME_SKILL_TYPE;
	numberValue?: number;
	wordValue?: string;
	phraseValue?: string;
}

export type ResumeSkillsSection = {
	heading: string;
	categories?: ResumeSkillCategory[];
	subSections?: ResumeSkillsSectionSubSection[];
}

export type ResumeSkillsSectionSubSection = {
	categories?: ResumeSkillCategory[];
}