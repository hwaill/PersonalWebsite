import Link from "next/link";
import Icon from "../../Icons/Icons";
import { ResumeExperience, ResumeSidebarItem, ResumeSkill, RESUME_SKILL_TYPE, ResumeSkillCategory, ResumeSkillsSection, ResumeSkillsSectionSubSection, RESUME_SIDEBAR_URL_TYPES } from "@/app/types";
import { RESUME_SECTIONS, SIDEBAR_ITEMS, SKILL_SECTION_CONTENT } from "@/app/constants/constants_resumeContent";

import style from "./resume.module.css"

export default function Resume() {
	return (
		<div className="sectionContent">
			<h2 className="greenText">My Resume</h2>
			<p>Here it is! Feast thine eyes upon this! This representation of my resume is still under construction, so feel free to download a PDF copy below.</p>
			<div className={style.resumeContainer + " neuLargeScreen neuDoublePadding"}>
				<ResumeSidebar />
				<div className={style.contentContainer}>
					<ResumeMainContent />
					<ResumeSkills data={SKILL_SECTION_CONTENT}/>
				</div>
			</div>
		</div>
	);
};

export function ResumeSidebar() {
	return (
		<div className={style.sidebarContainer}>
			<div className={style.logo}></div>
			<div className={style.nameContainer}>
				<h3 className={style.name}>Henry Waill</h3>
				<h6 className={style.tagline}>Creative Technologist</h6>
				<a className={style.smallScreenOnly} href="assets/2025_01_19_HenryWaill_Resume.pdf" download>
					<div className={style.download}>
						<div className={style.infoItemFlexCenter}>Download Resume</div>
					</div>
				</a>
			</div>
			<InfoSection items={SIDEBAR_ITEMS}/>
		</div>
	);
};

export function InfoSection({
	items
} : {
	items: ResumeSidebarItem[]
}) {
	return (
		<div className={style.infoContainer + " " + style.largeScreenOnly}>
			<ul className={style.infoList}>
				{items.map((item, index) => (
					<li key={index} className={style.infoItem}>
							{item.url ? (
								<Link className={style.infoItemLink} href={item.url} {...(item.urlType == RESUME_SIDEBAR_URL_TYPES.EXTERNAL ? {target: "_blank", rel: "noopener noreferrer"} : {})}>
									<div className={style.infoItemFlex}>
										<div className={style.infoItemIcon}>
											<Icon icon={item.icon}/>
										</div>
										<div className={style.infoItemText}>{item.text}</div>
									</div>
								</Link>
							) : (
								<div className={style.infoItemFlex}>
									<div className={style.infoItemIcon}>
										<Icon icon={item.icon}/>
									</div>
									<div className={style.infoItemText}>{item.text}</div>
								</div>
							)}
						</li>
				))}
				<li className={style.infoItem}>
					<a href="assets/2025_01_19_HenryWaill_Resume.pdf" download>
						<div className={style.download}>
							<div className={style.infoItemFlexCenter}>Download Resume</div>
						</div>
					</a>
				</li>
			</ul>
		</div>
	)
}

export function ResumeMainContent() {
	return (
		<div className={style.mainContent}>
			{RESUME_SECTIONS.map((section, index) => (
				<div key={index} className={style.section}>
					<h4 className={style.sectionHeader}>{section.heading}</h4>
					{section.items.map((item, index) => (
						<ExperienceItem key={index} data={item}/>
					))}
				</div>
			))}
		</div>
	);
};

export function ExperienceItem({
	data
} : {
	data: ResumeExperience
}) {
	return (
		<div className={style.experienceContainer}>
			<div className={style.experienceLogo}>
				{data.logoUrl && (
					<img src={data.logoUrl} alt="" />
				)}
			</div>
			<div className={style.experienceContent}>
				<div className={style.experienceHeadingContainer}>
					<div className={style.experienceHeading}>
						<span className={style.experiencePosition}>{data.position}</span><span className={style.experienceOrg}>{data.org}, </span><span className={style.experienceLocation}>{data.location}</span>
					</div>
					<div className={style.experienceDate}>{data.date}</div>
				</div>
				<ul className={style.experienceDescription}>
					{data.descriptions?.map((value, index) => (
						<li key={index} className={style.experienceDescriptionItem}>{value}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export function ResumeSkills({
	data
} : {
	data: ResumeSkillsSection
}) {
	return (
		<div className={style.section}>
			<h4 className={style.sectionHeader}>{data.heading}</h4>
			<div className={style.skillSectionContent}>
				{data.categories?.map((category, index) => (
					<SkillSectionCategory key={index} category={category} />
				))}
				{data.subSections?.map((subSection, index) => (
					<SkillSectionSubSection key={index} id={index} subSection={subSection} />
				))}
			</div>
		</div>
	)
}

export function SkillSectionSubSection({
	subSection,
	id
} : {
	subSection: ResumeSkillsSectionSubSection,
	id: number
}) {
	return (
		<div id={style["skillSubSection" + id]} className={style.skillSectionSubSectionContent}>
			{subSection.categories?.map((category, index) => (
				<SkillSectionCategory key={index} category={category} />
			))}
		</div>
	)
}

export function SkillSectionCategory({
	category
} : {
	category: ResumeSkillCategory
}) {
	return (
		<>
			<div className={style.skillHeading}>
				{category.name}
			</div>
			<div className={style.skillValue + " " + style.skillChild}>
				{category.type != undefined &&
					<SkillSectionValue
						type={category.type}
						numberValue={category.numberValue}
						wordValue={category.wordValue}
						phraseValue={category.phraseValue}
					/>
				}
			</div>
			{category.skills && 
				<div className={style.skillChild}>
					{category.skills.map((skill, index) => (
						<SkillSectionSkill key={index} skill={skill} />
					))}
				</div>
			}
			{category.subCategories &&
				<div className={style.skillChild}>
					{category.subCategories.map((subCategory, index) => (
						<SkillSectionCategory key={index} category={subCategory} />
					))}
			</div>
			}
		</>
	)
}

export function SkillSectionSkill({
	skill
} : {
	skill: ResumeSkill
}) {
	return (
		<>
			<div className={style.skillValueContainer}>
				<div className={style.skillValueLabel}>
					{skill.name}
				</div>
				{skill.type != RESUME_SKILL_TYPE.NO_VALUE &&
					<div {...(skill.type == RESUME_SKILL_TYPE.NUMBER_SCALE ? {className : style.skillValueNumberScale} : {})}>
						<SkillSectionValue type={skill.type} numberValue={skill.numberValue} wordValue={skill.wordValue} phraseValue={skill.phraseValue} />
					</div>
				}
			</div>
			{skill.description != undefined &&
				<div className={style.skillChild + " " + style.skillDescription}>{skill.description}</div>
			}
		</>
	)
}

export function SkillSectionValue({
	type,
	numberValue,
	wordValue,
	phraseValue
} : {
	type?: RESUME_SKILL_TYPE;
	numberValue?: number;
	wordValue?: string;
	phraseValue?: string;
}) {
	return (
		<>
			{type == RESUME_SKILL_TYPE.NO_VALUE && 
				<></>
			}
			{type == RESUME_SKILL_TYPE.NUMBER_SCALE && 
				<>
					{new Array(5).fill(0).map((_, key) => {
						if(numberValue != undefined && numberValue - 1 >= key) {
							return <div key={key} className={style.skillValueCircle + " " + style.filled}></div>
						} else {
							return <div key={key} className={style.skillValueCircle}></div>
						}
					})}
				</>
			}
			{type == RESUME_SKILL_TYPE.WORD_SCALE && 
				<span className={style.skillValueWord}>{wordValue}</span>
			}
			{type == RESUME_SKILL_TYPE.PHRASE && 
				<span className={style.skillValuePhrase}>{phraseValue}</span>
			}
		</>
	)
}