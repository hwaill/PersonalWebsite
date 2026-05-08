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