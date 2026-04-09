
import { Metadata } from 'next'
import React, { Suspense } from 'react'
import BookClubHeading from '../components/bookclub/BookClubHeading'
import BookClubMembersContent from '../components/bookclub/BookClubMembers'

export const metadata : Metadata = {
	title: "Members",
}

export default function BookClubMembers() {
	return (
		<>
		  <BookClubHeading />
			<Suspense>
				<BookClubMembersContent/>
			</Suspense>
		</>
	)
}