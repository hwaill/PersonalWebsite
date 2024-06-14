import { ReactNode } from "react";
import style from "./projects.module.css"

export default function ProjectSubSection({
	children,
	heading
} : {
	children: ReactNode,
	heading: string
}) {
	return (
		<>
			<div className={style.clearFix}></div>
			<div className={style.containerSmall}>
				<h4>{heading}</h4>
				{children}
			</div>
		</>
	)
}