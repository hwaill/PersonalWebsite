import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { featuredProjectsQuery } from '@/sanity/lib/queries'
import { resolveImage } from '@/sanity/lib/image'

type FeaturedProject = {
  _id: string
  title: string
  slug: { current: string }
  label?: string
  hook?: string
  description?: string
  previewImage?: { sanityImage?: unknown; externalUrl?: string; alt?: string }
  featuredIndex?: number
}

export default async function Projects() {
  const projects: FeaturedProject[] = await client.fetch(featuredProjectsQuery)

  return (
    <div className="pageSection">
      <h1>Some of my work</h1>
      <p>Here are a few of the projects that I&apos;m most proud of. Most started as a problem I wanted to solve or a skill I wanted to hone, and they run the gamut from design to engineering, and from hardware to software; There's even some weaving-related content! (Pretty much just various rectangles if that&apos;s your scene.)</p>
      <p>Come take a look!</p>

      {projects.length === 0 ? (
        <p style={{ color: 'var(--inactive)', marginTop: '1rem' }}>No featured projects yet.</p>
      ) : (
        projects.map((p, i) => {
          const imgSrc = resolveImage(p.previewImage, 300)
          const num = String(i + 1).padStart(2, '0')
          const isLast = i === projects.length - 1

          return (
            <Link key={p._id} href={`/projects/${p.slug.current}`}>
              <div className={`projectContainer${isLast ? ' last' : ''}`}>
                <div className="projectContainerNumber">{num}</div>
                <div className="projectContainerText">
                  {p.label && <p className="projectLabel">{p.label}</p>}
                  <h3>{p.title}</h3>
                  {p.hook && <h4>{p.hook}</h4>}
                  {p.description && <p>{p.description}</p>}
                </div>
                {imgSrc ? (
                  <div className="projectContainerImage">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgSrc} alt={p.title} />
                  </div>
                ) : (
                  <div className="projectContainerImage" />
                )}
              </div>
            </Link>
          )
        })
      )}

      <Link href="/projects" className="viewAllBtn">
        View all projects →
      </Link>
    </div>
  )
}
