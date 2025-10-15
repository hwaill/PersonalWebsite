import style from "../bookClub.module.css"
import BookClubNavigation from "./BookClubNavigation"

export default function BookClubHeading() {
	return (
		<div className={style.header}>
			<h1 className={style.heading}>The Book Club Archive</h1>
			<BookClubNavigation />
		</div>
	)
}