import prisma from "@/lib/prisma"

import style from "../../bookClub.module.css"
import Link from "next/link";
import { garamond } from "../../layout";

export default async function BookClubMemberContent({
	getMember,
	memberId
} : {
	getMember: (memberId: string) => Promise<({
    _count: {
        ratings: number;
    };
    ratings: {
        value: number;
        book: {
            id: number;
            title: string;
            imgUrl: string | null;
        };
    }[];
} & {
    id: number;
    name: string;
    imgUrl: string | null;
}) | null>,
	memberId: string
}) {
	const member = await getMember(memberId);

	return (
		<div className={style.bookClubMemberPage}>
			{member &&
				<div className={style.bookClubMemberPageContent}>
					<div className={style.bookClubMemberPageImageHolder}>
						{member.imgUrl ?
							<img className={style.bookClubMemberPageImage} src={"/img/bookClub/" + member.imgUrl} /> :
							<div className={style.bookClubMemberPageImageSub}><span>{member.name[0]}</span></div>
						}
					</div>
					<div className={style.bookClubMemberPageText}>
						<div className={style.bookClubMemberPageTextName + " " + garamond.className}>{member.name}</div>
						<div className={style.bookClubMemberPageTextBooksRead}>{member._count.ratings} book{member._count.ratings == 1 ? "" : "s"} read</div>
						<div className={style.bookClubMemberPageTextBookListTitle + " " + garamond.className}>Books Read</div>
						{member._count.ratings == 0 ? 
							<div className={style.bookClubMemberPageTextNoBooks}>This member has not read any books yet.</div> : 
							<div className={style.bookClubMemberPageTextBookList}>
								{member.ratings.map((item, index) => {
									return (
										<Link href={"/bookclub/books/book?id=" + item.book.id} className={style.bookClubMemberPageTextBookListing} key={index}>
											<div className={style.bookClubMemberPageTextBookImageHolder}>
												{item.book.imgUrl ?
													<img className={style.bookClubMemberPageTextBookImage} src={item.book.imgUrl} /> :
													<></>
												}
											</div>
											<div className={style.bookClubMemberPageTextBookText}>
												<div className={style.bookClubMemberPageTextBookTextTitle}>{item.book.title}</div>
												<div className={style.bookClubMemberPageTextBookTextRating}><span className={garamond.className}>{item.value}</span> out of 7</div>
											</div>
										</Link>
									)
								})}
							</div>
						}
					</div>
				</div>
			}
		</div>
	)
}