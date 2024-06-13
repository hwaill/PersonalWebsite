import { ReactNode } from "react";
import style from "./wrappers.module.css"

export default function ContentWrapper({
	children
} : {
	children: ReactNode
}) {
	return (
		<div className={style.contentWrapper}>
			{children}
		</div>
	)
}