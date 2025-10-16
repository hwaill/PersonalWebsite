import { Metadata } from 'next'
import React, { Suspense } from 'react'
import BookClubHeading from '../../components/BookClubHeading'
import BookClubMembersContent from '../../components/BookClubMembers'

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