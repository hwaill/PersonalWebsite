import React from "react";
import style from "./homePageContent.module.css";
import MyWork from "./MyWork/MyWork";

const HomePageContent = () => {
	return (
		<div className={style.pageContent}>
			<MyWork />
		</div>
	);
};

export default HomePageContent;