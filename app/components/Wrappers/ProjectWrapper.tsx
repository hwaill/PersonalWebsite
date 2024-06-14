import { ReactNode } from "react";
import style from "./wrappers.module.css"

export default function ProjectWrapper({
	children
} : {
	children: ReactNode
}) {
	return (
		<div className={style.projectWrapper}>
			{children}
		</div>
	)
}