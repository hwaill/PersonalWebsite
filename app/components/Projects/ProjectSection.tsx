import { ReactNode } from "react";
import style from "./projects.module.css"

export default function ProjectSection({
	children,
	heading
} : {
	children: ReactNode,
	heading: string
}) {
	return (
		<>
			<div className={style.clearFix}></div>
			<div className={style.containerBig}>
				<h3>{heading}</h3>
				{children}
			</div>
		</>
	)
}