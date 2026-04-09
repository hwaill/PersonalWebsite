import { Metadata } from 'next'
import React, { cache, Suspense } from 'react'

import prisma from '@/lib/prisma'
import BookClubHeading from '../../components/bookclub/BookClubHeading';
import BookClubMemberContent from '../../components/bookclub/BookClubMember';

export async function generateMetadata({
	searchParams
} : {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	const idSearch = searchParams?.id || "1";
	const id = Array.isArray(idSearch) ? idSearch[0] : idSearch;

	const member = await getMember(id);
	const memberName = member?.name || "";

	return {
		title: memberName
	}
}

const getMember = cache(async (memberId: string) => {
	const member = await prisma.bookClubMember.findFirst({
		where: {
			id: parseInt(memberId)
		},
		include: {
			_count: {
				select: {
					ratings: true
				}
			},
			ratings: {
				select: {
					value: true,
					book: {
						select: {
							title: true,
							imgUrl: true,
							id: true
						}
					}
				},
				orderBy: {
					id: "asc"
				}
			}
		},
		orderBy: {
			id: "desc"
		}
	});

	return member;
})

export default function BookClub({
	searchParams
} : {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	const idSearch = searchParams?.id || "1";
	const id = Array.isArray(idSearch) ? idSearch[0] : idSearch;

	return (
		<>
		  <BookClubHeading />
			<Suspense>
				<BookClubMemberContent getMember={getMember} memberId={id}/>
			</Suspense>
		</>
	)
}