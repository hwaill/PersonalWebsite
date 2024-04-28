import React from 'react';
import style from '../myWork.module.css';
import Link from 'next/link';

const MacroPad = () => {
	return (
		<div className={style.projectContainer + " neu neuShallow"}>
			<div className={style.projectImageHolder}>
				<div className={style.projectImage} id={style.macroPadImage}></div>
			</div>
			<div className={style.projectText}>
				<div id={style.macroPadLogo}></div>
				<p>The <em>todos productivity board</em> is a task management tool designed for those who struggle with attention and executive function.</p>
				<p>At the intersection of analog and digital technologies, <em>todos</em> combines tactile interaction on a familiar interface with the ability to track habit-building progress, trends in mood and much more.</p>
				<Link href="/projects/macropad/">
					<div className={style.learnMore + " neuShallow neuButton"}>Learn more</div>
				</Link>
			</div>
		</div>
	);
};

export default MacroPad;
