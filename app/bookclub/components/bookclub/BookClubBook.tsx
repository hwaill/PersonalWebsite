import prisma from "@/lib/prisma"

import style from "../../bookClub.module.css"
import Link from "next/link";
import { garamond } from "../../layout";

export default async function BookClubBookContent({
	getBook,
	bookId
} : {
	getBook: (bookId: string) => Promise<({
    ratings: {
      value: number;
      member: {
        name: string;
      	imgUrl: string | null;
				id: number;
      };
    }[];
	} & {
    id: number;
    title: string;
    author: string;
    genre: string;
    inProgress: boolean;
    averageRating: number;
    imgUrl: string | null;
	}) | null>,
	bookId: string
}) {
	const book = await getBook(bookId);

	return (
		<div className={style.bookClubBookPage}>
			{book &&
				<div className={style.bookClubBookPageContent}>
					{book.imgUrl &&
						<div className={style.bookClubBookPageImageHolder}>
							<img  className={style.bookClubBookPageImage} src={book.imgUrl} />
						</div>
					}
					<div className={style.bookClubBookPageText}>
						<div className={style.bookClubBookPageTextTitle + " " + garamond.className}>{book.title}</div>
						<div className={style.bookClubBookPageTextAuthor}>By {book.author}</div>
						<div className={style.bookClubBookPageTextGenre}>{book.genre == "FICTION" ? "Fiction" : "Nonfiction"}</div>
						<div className={style.bookClubBookPageTextRating}>
							{book.inProgress ?
								<span><em>This book is in progress.</em></span> :
								<span><span className={style.bookClubBookPageTextRatingNumber+ " " + garamond.className}>{book.averageRating.toFixed(2)}</span> out of 7 Club Rating</span>
							}
						</div>
						{book.inProgress ?
							<></> : 
							<>
								<div className={style.bookClubBookPageTextMemberRatingsTitle + " " + garamond.className}>Member Ratings</div>
								<div className={style.bookClubBookPageTextMemberRatings}>
									{book.ratings.map((item, index) => {
										return (
											<Link href={"/bookclub/members/member?id=" + item.member.id} className={style.bookClubBookPageTextMemberRating} key={index}>
												<div className={style.bookClubBookPageTextMemberImageHolder}>
													{item.member.imgUrl ?
														<img className={style.bookClubBookPageTextMemberImage} src={"/img/bookClub/" + item.member.imgUrl} /> :
														<div className={style.bookClubBookPageTextMemberImageSub}><span>{item.member.name[0]}</span></div>
													}
												</div>
												<div className={style.bookClubBookPageTextMemberText}>
													<div className={style.bookClubBookPageTextMemberTextName}>{item.member.name}</div>
													<div className={style.bookClubBookPageTextMemberTextRating}><span className={garamond.className}>{item.value}</span> out of 7</div>
												</div>
											</Link>
										)
									})}
								</div>
							</>
						}
					</div>
				</div>
			}
		</div>
	)
}