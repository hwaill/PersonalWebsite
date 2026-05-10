'use client'
import { useState } from 'react'

type ExperienceData = {
	org: string
	position: string
	location?: string
	date?: string
	descriptions?: string[]
}

export function ExperienceItem({
	data,
	isLast,
	logoSrc,
	logo2Src,
}: {
	data: ExperienceData
	isLast: boolean
	logoSrc: string | null
	logo2Src: string | null
}) {
	const [isOpen, setIsOpen] = useState(false)
	const hasBullets = data.descriptions && data.descriptions.length > 0

	return (
		<div className={`resumeExp${isLast ? ' resumeExpLast' : ''}`}>
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
				{hasBullets ? (
					<button
						className="resumeExpHeading resumeExpToggleable"
						onClick={() => setIsOpen(o => !o)}
						aria-expanded={isOpen}
					>
						<div className="resumeExpTitleRow">
							<span className="resumeExpPosition">{data.position}</span>
							<br />
							{data.org && <span className="resumeExpOrg">{data.org}</span>}
							{data.org && data.location && <span className="resumeExpSep">,</span>}
							{data.location && <span className="resumeExpLocation">{data.location}</span>}
						</div>
						<div className="resumeExpMeta">
							{data.date && <span className="resumeExpDate">{data.date}</span>}
							<svg
								className={`resumeExpChevron${isOpen ? ' open' : ''}`}
								width="14" height="14" viewBox="0 0 14 14"
								fill="none" stroke="currentColor" strokeWidth="2"
								strokeLinecap="round" strokeLinejoin="round"
								aria-hidden="true"
							>
								<polyline points="3 5 7 9 11 5" />
							</svg>
						</div>
					</button>
				) : (
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
				)}

				{hasBullets && (
					<div className={`resumeExpBulletsWrapper${isOpen ? ' open' : ''}`}>
						<ul className="resumeExpBullets">
							{data.descriptions!.map((desc, i) => (
								<li
									key={i}
									className="resumeExpBullet"
									style={{ '--bullet-index': i } as React.CSSProperties}
								>
									{desc}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}
