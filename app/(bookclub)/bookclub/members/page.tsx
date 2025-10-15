import { Metadata } from 'next'
import React, { Suspense } from 'react'

import style from "../bookclub.module.css"

import prisma from '@/lib/prisma'
import Image from 'next/image'
import BookClubHeading from '../../components/BookClubHeading'

export const metadata : Metadata = {
	title: "Members",
}

export default async function BookClub({
	searchParams
} : {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	return (
		<>
		  <BookClubHeading />
			<Suspense>
			</Suspense>
		</>
	)
}