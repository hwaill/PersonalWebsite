import React from 'react';
import style from './myWork.module.css';
import MyWorkSection from './MyWorkSection';
import { PROJECTS } from '@/app/constants';



export default function MyWork() {
	return (
		<div className="homePageSection">
			<h2 className="blueText">My work</h2>
			<p>My interests are varied</p>
			{PROJECTS.map((object, i) => (
				<MyWorkSection key={i} data={object} />
			))}
		</div>
	);
}