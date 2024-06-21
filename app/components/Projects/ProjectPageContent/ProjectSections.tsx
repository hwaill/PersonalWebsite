import { ReactNode } from "react";
import style from "./projects.module.css"

export function ProjectSection({
	children,
	heading
} : {
	children: ReactNode,
	heading: string
}) {
	return (
		<>
			<div className={style.containerBig}>
				<h3>{heading}</h3>
				{children}
				<div className={style.clearFix}></div>
			</div>
		</>
	);
};

export function ProjectSectionContinue({
	children,
} : {
	children: ReactNode
}) {
	return (
		<>
			<div className={style.containerBig}>
				{children}
				<div className={style.clearFix}></div>
			</div>
		</>
	);
};

export function ProjectSubSection({
	children,
	heading
} : {
	children: ReactNode,
	heading: string
}) {
	return (
		<>
			<div className={style.containerSmall}>
				<h4>{heading}</h4>
				{children}
			</div>
		</>
	);
};

export function ProjectSubSectionContinue({
	children
} : {
	children: ReactNode
}) {
	return (
		<>
			<div className={style.containerSmall}>
				{children}
			</div>
		</>
	);
};

export function ProjectParagraph({
	children
} : {
	children: ReactNode
}) {
	return <p className={style.projectParagraph}>{children}</p>
}