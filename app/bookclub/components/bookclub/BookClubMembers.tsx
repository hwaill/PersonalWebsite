import prisma from "@/lib/prisma"

import style from "../../bookClub.module.css"
import { Suspense } from "react";
import Link from "next/link";
import { garamond } from "../../layout";

export default async function BookClubMembersContent() {
	const members = await prisma.bookClubMember.findMany({
		orderBy: {
			name: "asc"
		},
		include: {
			_count: {
				select: {
					ratings: true
				}
			}
		}
	});
	

	return (
		<Suspense>
			<div className={style.bookClubSubtitle + " " + garamond.className}>Members</div>
			<div className={style.bookClubMembers}>
				{members && members.map((value, index) => {
					return (
						<div className={style.bookClubMember} key={index}>
							<BookClubMember member={value} />
						</div>
					)
				})}
			</div>
		</Suspense>
	)
}

async function BookClubMember({
	member
} : {
	member: {
		id: number,
		imgUrl: string | null,
		name: string
		_count: {
			ratings: number
		}
	}
}) {

	return (
		<>
			<div className={style.bookClubMemberImageHolder}>
				{member.imgUrl ?
					<img className={style.bookClubMemberImage} src={"/img/bookClub/" + member.imgUrl} /> :
					<div className={style.bookClubMemberImageSub}><span>{member.name[0]}</span></div>
				}
			</div>
			<div className={style.bookClubMemberText}>
				<div className={style.bookClubMemberTextName + " " + garamond.className }>{member.name}</div>
				<div className={style.bookClubMemberTextRatings}>{member._count.ratings} book{member._count.ratings == 1 ? "" : "s"} read</div>
				<Link href={"/bookclub/members/member?id=" + member.id} className={style.bookClubMemberViewProfile}>
					View Profile
				</Link>
			</div>
		</>
	)
}