import React from 'react';
import style from '../myWork.module.css'

const Whiteboard = () => {
	return (
		<div className={style.projectContainer}>
			<div className={style.projectImage} id={style.whiteboardImage}></div>
			<div className={style.projectText}></div>
		</div>
	);
};

export default Whiteboard;
