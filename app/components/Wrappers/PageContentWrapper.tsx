import { ReactNode } from "react";
import style from "./wrappers.module.css"

export default function PageContentWrapper({
	children
} : {
	children: ReactNode
}) {
	return (
		<div className="pageContentWrapper">
			{children}
		</div>
	)
}