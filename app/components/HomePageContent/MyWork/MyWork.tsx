import React from 'react';
import style from './myWork.module.css';
import MyWorkSection from './MyWorkSection';

export default function MyWork() {
	return (
		<div className="section">
			<div className="sectionText">
				<h2 className="blueText">My Work</h2>
				<p>My interests </p>
			</div>
			<MyWorkSection
				imgUrl='/img/projects/todos/banner.jpg'
				imgStyle='{"objectPosition":"15% center"}'
				logoUrl='/img/projects/todos/logo.svg'
				logoStyle='{"height":"5rem"}'
				description='<p>The <em>todos productivity board</em> is a task management tool designed for those who struggle with attention and executive function.</p><p>At the intersection of analog and digital technologies, <em>todos</em> combines tactile interaction on a familiar interface with the ability to track habit-building progress, trends in mood and much more.</p>'
				linkUrl='/projects/productivityboard/' />
			<MyWorkSection
				imgUrl='/img/projects/macropad/banner.jpg'
				imgStyle='{"objectPosition":"53% center"}'
				logoUrl='/img/projects/macropad/logo.svg'
				logoStyle='{"height":"2rem"}'
				description='<p><em>Macropad 2040</em> is a customizable desk gadget that extends the functionality of a traditional computer keyboard.</p>'
				linkUrl='/projects/macropad/' />
		</div>
	);
}