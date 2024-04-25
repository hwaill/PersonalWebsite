import React from "react";
import style from "./pageContent.module.css";
import MyWork from "./MyWork/MyWork";

const PageContent = () => {
	return (
		<div className={style.pageContent}>
			<MyWork />
		</div>
	);
};

export default PageContent;