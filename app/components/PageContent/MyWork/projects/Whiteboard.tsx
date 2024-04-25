import React from 'react';
import style from '../myWork.module.css'

const Whiteboard = () => {
	return (
		<div className={style.projectContainer + " neu neuShallow"}>
			<div className={style.projectImageHolder}>
				<div className={style.projectImage} id={style.whiteboardImage}></div>
			</div>
			<div className={style.projectText}>
				<h3>Todos Productivity Board</h3>
			</div>
		</div>
	);
};

export default Whiteboard;
