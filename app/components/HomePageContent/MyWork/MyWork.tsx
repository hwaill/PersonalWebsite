import React from 'react';
import style from './myWork.module.css';
import Whiteboard from './MyWorkSections/Whiteboard';
import MacroPad from './MyWorkSections/MacroPad';

const MyWork = () => {
	return (
		<div className={style.myWork}>
			<div className={"sectionText"}>
				<h1 className={"coralText"}>My Work</h1>
				<p>ASDFasdf al;sdkjfhlkasjdhf lkasjdhflkjasdhflkjashdflkjhasldkj flkkjasdf lkjashdf lkkjash dflkjh asdlfh</p>
			</div>
			<Whiteboard />
			<MacroPad />
		</div>
	);
};

export default MyWork;