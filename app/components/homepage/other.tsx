import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { hijinksQuery } from '@/sanity/lib/queries'
import { resolveImage } from '@/sanity/lib/image'

type Hijink = {
  _id: string
  title: string
  label?: string
  hook?: string
  description?: string
  previewImage?: { sanityImage?: unknown; externalUrl?: string; alt?: string }
  destinationLink: string
  displayIndex?: number
}

function HijinkCard({ hijink, index, isLast }: { hijink: Hijink; index: number; isLast: boolean }) {
  const imgSrc = resolveImage(hijink.previewImage, 300)
  const num = String(index + 1).padStart(2, '0')
  const isExternal = hijink.destinationLink.startsWith('http')

  const inner = (
    <div className={`projectContainer${isLast ? ' last' : ''}`}>
      <div className="projectContainerSpacer" />
      <div className="projectContainerNumber">{num}</div>
      <div className="projectContainerText">
        {hijink.label && <p className="projectLabel">{hijink.label}</p>}
        <h3>{hijink.title}</h3>
        {hijink.hook && <h4>{hijink.hook}</h4>}
        {hijink.description && <p>{hijink.description}</p>}
      </div>
      {imgSrc ? (
        <div className="projectContainerImage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgSrc} alt={hijink.title} />
        </div>
      ) : (
        <div className="projectContainerImage" />
      )}
      <div className="projectContainerArrow" />
    </div>
  )

  if (isExternal) {
    return (
      <a key={hijink._id} href={hijink.destinationLink} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }

  return (
    <Link key={hijink._id} href={hijink.destinationLink}>
      {inner}
    </Link>
  )
}

export default async function Other() {
  const hijinks: Hijink[] = await client.fetch(hijinksQuery)

  return (
    <div className="pageSection">
      <h1>Other Hijinks</h1>
      <p>Here are a few of the projects that I&apos;m most proud of. Most started as a problem I wanted to solve or a skill I wanted to hone, and they run the gamut from design to engineering, and from hardware to software; There's even some weaving-related content! (Pretty much just various rectangles if that&apos;s your scene.)</p>
      <p>Come take a look!</p>

      {hijinks.length === 0 ? (
        <p style={{ color: 'var(--inactive)', marginTop: '1rem' }}>Nothing here yet.</p>
      ) : (
        hijinks.map((h, i) => (
          <HijinkCard key={h._id} hijink={h} index={i} isLast={i === hijinks.length - 1} />
        ))
      )}
    </div>
  )
}
