import { client } from '@/sanity/lib/client'
import { resumeQuery } from '@/sanity/lib/queries'
import { resolveImage } from '@/sanity/lib/image'

type LogoField = { sanityImage?: unknown; externalUrl?: string }

type SkillData = {
	name: string
	type: 'numberScale' | 'wordScale' | 'noValue'
	numberValue?: number
	wordValue?: string
	description?: string
}

type CategoryData = {
	name: string
	type: 'list' | 'phrase'
	phraseValue?: string
	skills?: SkillData[]
}

type SubSectionData = {
	categories?: CategoryData[]
}

type ExperienceData = {
	org: string
	position: string
	location?: string
	date?: string
	logo?: LogoField
	logo2?: LogoField
	descriptions?: string[]
}

type SectionData = {
	heading: string
	items?: ExperienceData[]
}

type ResumeData = {
	fullName?: string
	headline?: string
	email?: string
	phone?: string
	website?: string
	location?: string
	sections?: SectionData[]
	skillsSection?: {
		heading?: string
		subSections?: SubSectionData[]
	}
}

export default async function Resume() {
	const data: ResumeData | null = await client.fetch(resumeQuery)

	if (!data) {
		return (
			<div className="pageSection">
				<h1>My Resume</h1>
				<p style={{ color: 'var(--inactive)', marginTop: '1rem' }}>Resume coming soon.</p>
			</div>
		)
	}

	const contactItems = [
		data.email    && { label: 'Email',    value: data.email,                                    href: `mailto:${data.email}` },
		data.phone    && { label: 'Phone',    value: data.phone,                                    href: `tel:${data.phone}` },
		data.location && { label: 'Location', value: data.location,                                 href: null },
		data.website  && { label: 'Website',  value: data.website.replace(/^https?:\/\//, ''),      href: data.website },
	].filter(Boolean) as { label: string; value: string; href: string | null }[]

	return (
		<div className="pageSection">
			<h1>My Resume</h1>
			<h2>Here it is! Feast thine eyes upon this!</h2>
			<div className="resumeBody">
				<div className="resumeSidebar">
					<div className="resumeSidebarTop">
						<div className="resumeSidebarLogo" aria-hidden="true" />
						<div className="resumeSidebarNameBlock">
							{data.fullName && <div className="resumeSidebarName">{data.fullName}</div>}
							{data.headline && <div className="resumeSidebarTagline">{data.headline}</div>}
						</div>
					</div>
					{contactItems.length > 0 && (
						<ul className="resumeContactList">
							{contactItems.map((item, i) => (
								<li key={i} className="resumeContactItem">
									<span className="resumeContactLabel">{item.label}</span>
									{item.href ? (
										<a
											href={item.href}
											{...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
										>
											{item.value}
										</a>
									) : (
										item.value
									)}
								</li>
							))}
						</ul>
					)}
				</div>

				<div className="resumeMain">
					{data.sections?.map((section, i) => (
						<div key={i} className="resumeSection">
							<div className="resumeSectionHeading">{section.heading}</div>
							{section.items?.map((item, j) => (
								<ExperienceItem key={j} data={item} />
							))}
						</div>
					))}

					{data.skillsSection && (
						<div className="resumeSection">
							<div className="resumeSectionHeading">
								{data.skillsSection.heading ?? 'Additional Information'}
							</div>
							<SkillsContent subSections={data.skillsSection.subSections ?? []} />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

function ExperienceItem({ data }: { data: ExperienceData }) {
	const logoSrc  = resolveImage(data.logo,  80)
	const logo2Src = resolveImage(data.logo2, 80)

	return (
		<div className="resumeExp">
			<div className="resumeExpLogos">
				{logoSrc ? (
					<div className="resumeExpLogo">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={logoSrc} alt={data.org} loading="lazy" />
					</div>
				) : (
					<div className="resumeExpLogo" />
				)}
				{logo2Src && (
					<div className="resumeExpLogo">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={logo2Src} alt="" loading="lazy" />
					</div>
				)}
			</div>

			<div className="resumeExpContent">
				<div className="resumeExpHeading">
					<div className="resumeExpTitleRow">
						<span className="resumeExpPosition">{data.position}</span>
						<br />
						{data.org && <span className="resumeExpOrg">{data.org}</span>}
						{data.org && data.location && <span className="resumeExpSep">,</span>}
						{data.location && <span className="resumeExpLocation">{data.location}</span>}
					</div>
					{data.date && <span className="resumeExpDate">{data.date}</span>}
				</div>

				{data.descriptions && data.descriptions.length > 0 && (
					<ul className="resumeExpBullets">
						{data.descriptions.map((desc, i) => (
							<li key={i} className="resumeExpBullet">{desc}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

function SkillsContent({ subSections }: { subSections: SubSectionData[] }) {
	return (
		<div className="resumeSkillsGrid">
			{subSections.map((sub, i) => (
				<div key={i} className="resumeSkillSubSection">
					{sub.categories?.map((cat, j) => (
						<SkillCategory key={j} cat={cat} />
					))}
				</div>
			))}
		</div>
	)
}

function SkillCategory({ cat }: { cat: CategoryData }) {
	return (
		<div className="resumeSkillCategory">
			<div className="resumeSkillCategoryName">{cat.name}</div>
			{cat.type === 'phrase' ? (
				<div className="resumeSkillCategoryPhrase">{cat.phraseValue}</div>
			) : (
				<div>
					{cat.skills?.map((skill, i) => (
						<SkillItem key={i} skill={skill} />
					))}
				</div>
			)}
		</div>
	)
}

function SkillItem({ skill }: { skill: SkillData }) {
	return (
		<div className="resumeSkillEntry">
			<div className="resumeSkillItem">
				<span className="resumeSkillName">{skill.name}</span>
				{skill.type === 'numberScale' && skill.numberValue != null && (
					<span className="resumeSkillDots" aria-label={`${skill.numberValue} out of 5`}>
						{Array.from({ length: 5 }, (_, i) => (
							<span key={i} className={`resumeSkillDot${i < skill.numberValue! ? ' filled' : ''}`} />
						))}
					</span>
				)}
				{skill.type === 'wordScale' && skill.wordValue && (
					<span className="resumeSkillWord">{skill.wordValue}</span>
				)}
			</div>
			{skill.description && (
				<div className="resumeSkillDesc">{skill.description}</div>
			)}
		</div>
	)
}
