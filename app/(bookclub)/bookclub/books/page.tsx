import { Metadata } from 'next'
import React, { Suspense } from 'react'

import style from "../bookclub.module.css"

import prisma from '@/lib/prisma'
import Image from 'next/image'
import BookClubHeading from '../../components/BookClubHeading'
import BookClubBooksContent from '../../components/BookClubBooks'

export const metadata : Metadata = {
	title: "Books",
}

export default function BookClubBooks({
	searchParams
} : {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	return (
		<>
		  <BookClubHeading />
				<Suspense>
					<BookClubBooksContent searchParams={searchParams}/>
				</Suspense>
			</>
	)
}