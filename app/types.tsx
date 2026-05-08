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

export type EmailData = {
	name: string;
	email: string;
	message: string;
};

export enum RESUME_SIDEBAR_URL_TYPES {
	EXTERNAL,
	LOCAL
}

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

export type ResumeSkillsSectionSubSection = {
	categories?: ResumeSkillCategory[];
}

export type ResumeSkillsSection = {
	heading: string;
	categories?: ResumeSkillCategory[];
	subSections?: ResumeSkillsSectionSubSection[];
}

export type BookClubNavItem = {
	title: string;
	url: string;
	icon?: string;
};

// Book Club data types

export type BCImage = {
	_type?: string
	asset?: { _type?: string; _ref?: string }
	hotspot?: { x: number; y: number; height: number; width: number }
}

// Dual-source cover image: Sanity upload OR external/internal URL
export type BCCoverImage = {
	sanityImage?: BCImage
	externalUrl?: string
	alt?: string
}

export type BCMemberSummary = {
	_id: string
	name: string
	tagline?: string
	photo?: BCImage
}

export type BCRating = {
	_id: string
	_createdAt?: string
	value: number
	review?: string
	member: BCMemberSummary
}

export type BCMemberRating = {
	_id: string
	_createdAt?: string
	value: number
	review?: string
	book: {
		_id: string
		title: string
		author: string
		genre?: string
		coverImage?: BCCoverImage
		yearPublished?: number
		pages?: number
		dateCompleted?: string
		inProgress?: boolean
	}
}

export type BCBook = {
	_id: string
	title: string
	author: string
	genre?: 'fiction' | 'nonfiction'
	pages?: number
	yearPublished?: number
	inProgress?: boolean
	dateCompleted?: string
	coverImage?: BCCoverImage
	ratingValues: number[]
	avgRating: number | null
	coverUrl: string | null
}

export type BCBookDetail = {
	_id: string
	title: string
	author: string
	genre?: 'fiction' | 'nonfiction'
	pages?: number
	yearPublished?: number
	inProgress?: boolean
	dateCompleted?: string
	coverImage?: BCCoverImage
	mvp?: BCMemberSummary
	ratings: BCRating[]
}

export type BCMvpBook = {
	_id: string
	title: string
	author: string
	coverImage?: BCCoverImage
}

export type BCMember = {
	_id: string
	name: string
	tagline?: string
	photo?: BCImage
	ratingCount: number
	mvpWins?: number
}

export type BCMemberDetail = {
	_id: string
	name: string
	tagline?: string
	photo?: BCImage
	mvpBooks: BCMvpBook[]
	ratings: BCMemberRating[]
}