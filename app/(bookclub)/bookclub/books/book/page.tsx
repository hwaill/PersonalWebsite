import { Metadata } from 'next'
import React, { cache, Suspense } from 'react'

import style from "../bookclub.module.css"

import prisma from '@/lib/prisma'
import Image from 'next/image'
import BookClubHeading from '../../../components/BookClubHeading'
import BookClubBookContent from '../../../components/BookClubBook'

export async function generateMetadata({
	searchParams
} : {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	const idSearch = searchParams?.id || "1";
	const id = Array.isArray(idSearch) ? idSearch[0] : idSearch;

	const book = await getBook(id);
	const bookTitle = book?.title || "";

	return {
		title: bookTitle
	}
}

export const getBook = cache(async (bookId: string) => {
	const book = await prisma.bookClubBook.findFirst({
		where: {
			id: parseInt(bookId)
		},
		include: {
			ratings: {
				select: {
					value: true,
					member: {
						select: {
							name: true,
							imgUrl: true,
							id: true
						}
					}
				},
				orderBy: {
					member: {
						name: "asc"
					}
				}
			}
		}
	});

	return book;
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
					<BookClubBookContent getBook={getBook} bookId={id}/>
				</Suspense>
			</>
	)
}