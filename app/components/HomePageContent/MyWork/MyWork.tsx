import React from 'react';
import style from './myWork.module.css';
import MyWorkSection from './MyWorkSection';

const projects = [{
	heading: 'Todos Productivity Board',
	tags: [
		'robotics',
		'arduino',
		'custom pcb'
	],
	hook: 'A new way to build habits.',
	description: 'Improve task management for those who struggle with attention and executive function.',
	imgUrl: '/img/projects/todos/banner.jpg',
	imgStyle: '{"objectPosition":"15% center"}',
	linkUrl: '/projects/productivityboard/'
},{
	heading: 'Macropad 2040',
	tags: [
		'custom pcb',
		'product-ready'
	],
	hook: 'A faster workflow at your fingertips.',
	description: 'A customizable desk gadget that extends the functionality of a traditional computer keyboard.',
	imgUrl: '/img/projects/macropad/banner.jpg',
	imgStyle: '{"objectPosition":"53% center"}',
	linkUrl: '/projects/macropad/'
}];

export default function MyWork() {
	return (
		<div className="section">
			<div className="sectionText">
				<h2 className="blueText">My work</h2>
				<p>My interests are varied and </p>
			</div>
			{projects.map((object, i) => (
				<MyWorkSection key={i} data={object} />
			))}
		</div>
	);
}