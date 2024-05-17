import React from 'react';
import style from './myWork.module.css';
import MyWorkSection from './MyWorkSection';

import prisma from '@/lib/prisma';

export default async function MyWork() {
	const projects = await prisma.projectSection.findMany({
		select: {
			id: true,
			imgUrl: true,
			imgStyle: true,
			logoUrl: true,
			logoStyle: true,
			description: true,
			linkUrl: true
		},
		orderBy: {
			id: "asc"
		}
	});

	return (
		<div className={style.myWork}>
			<div className={"sectionText"}>
				<h2 className={"coralText"}>My Work</h2>
				<p>ASDFasdf al;sdkjfhlkasjdhf lkasjdhflkjasdhflkjashdflkjhasldkj flkkjasdf lkjashdf lkkjash dflkjh asdlfh</p>
			</div>
			{
				projects.map((project) => {
					return <MyWorkSection
						key={project.id}
						imgUrl={project.imgUrl}
						imgStyle={project.imgStyle ? project.imgStyle : "{}"}
						logoUrl={project.logoUrl}
						logoStyle={project.logoStyle ? project.logoStyle : "{}"}
						description={project.description}
						linkUrl={project.linkUrl}
					/>
				})
			}
		</div>
	);
}