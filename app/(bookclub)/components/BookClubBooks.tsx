import prisma from "@/lib/prisma"

import style from "../bookClub.module.css"
import BookClubBookSort from "./BookClubBooksSort";
import { Suspense } from "react";
import Link from "next/link";

export default async function BookClubBooksContent({
	searchParams
} : {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	const sortBySearch = searchParams?.sortBy ?? "";
	const sortBy = Array.isArray(sortBySearch) ? sortBySearch[0] : sortBySearch;

	var books;
	if(sortBy == "0" || sortBy == "") {
		books = await prisma.bookClubBook.findMany({
			include: {
				ratings: {
					select: {
						value: true
					}
				}
			},
			orderBy: {
				id: "desc"
			}
		});
	} else if(sortBy == "1") {
		books = await prisma.bookClubBook.findMany({
			include: {
				ratings: {
					select: {
						value: true
					}
				}
			},
			orderBy: {
				id: "asc"
			}
		});
	} else if(sortBy == "2") {
		books = await prisma.bookClubBook.findMany({
			include: {
				ratings: {
					select: {
						value: true
					}
				}
			},
			orderBy: [{
				inProgress: "desc"
			},{
				averageRating: "desc"
			}
			]
		});
	} else if(sortBy == "3") {
		books = await prisma.bookClubBook.findMany({
			include: {
				ratings: {
					select: {
						value: true
					}
				}
			},
			orderBy: [{
				inProgress: "desc"
			},{
				averageRating: "asc"
			}]
		});
	}

	return (
		<Suspense>
			<BookClubBookSort />
			<div className={style.bookClubBooks}>
				{books && books.map((value, index) => {
					return (
						<div className={style.bookClubBook} key={index}>
							<BookClubBook book={value} />
						</div>
					)
				})}
			</div>
		</Suspense>
	)
}

async function BookClubBook({
	book
} : {
	book: {
		id: number,
		title: string,
		author: string,
		genre: string,
		inProgress: boolean,
		imgUrl: string | null,
		ratings: {
			value: number
		}[]
	}
}) {
	var averageRating = 0;
	if(book.ratings.length > 0) {
		for(var i = 0; i < book.ratings.length; i++) {
			averageRating += book.ratings[i].value;
		}
		averageRating /= book.ratings.length;
	}

	return (
		// <Link href={"/bookclub/books/book?id=" + book.id}>
		<>
			{book.imgUrl &&
				<div className={style.bookClubBookImageHolder}>
					<img  className={style.bookClubBookImage} src={book.imgUrl} />
					<div className={style.bookClubBookTextGenre}>{book.genre == "FICTION" ? "Fiction" : "Nonfiction"}</div>
				</div>
			}
			<div className={style.bookClubBookText}>
				<div className={style.bookClubBookTextTitle}>{book.title}</div>
				<div className={style.bookClubBookTextAuthor}>By {book.author}</div>
				<div className={style.bookClubBookTextRating}>
					{book.inProgress ?
						<span><em>This book is in progress.</em></span> :
						<span><span className={style.bookClubBookTextRatingNumber}>{averageRating.toFixed(2)}</span> out of 7 Club Rating</span>
					}
				</div>
				{!book.inProgress &&
					<Link href={"/bookclub/books/book?id=" + book.id} className={style.bookClubBookTextSeeMore}>See more</Link>
				}
			</div>
		</>
	)
}