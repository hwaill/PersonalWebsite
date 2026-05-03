import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { allProjectsQuery } from '@/sanity/lib/queries'
import { resolveImage } from '@/sanity/lib/image'
import { NavLinksRegistrar } from '@/app/components/nav/NavLinksRegistrar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of Henry Waill\'s projects.',
}

type ProjectSummary = {
  _id: string
  title: string
  slug: { current: string }
  label?: string
  hook?: string
  description?: string
  tags?: Array<{ label: string; value: string }>
  previewImage?: { sanityImage?: unknown; externalUrl?: string; alt?: string }
  featured: boolean
  featuredIndex?: number
}

export default async function ProjectsPage() {
  const projects: ProjectSummary[] = await client.fetch(allProjectsQuery)

  const featured = projects.filter(p => p.featured)
  const others = projects.filter(p => !p.featured)

  return (
    <main className="pageContent projectsPage">
      <NavLinksRegistrar links={[
        { href: '#featured', label: 'Featured' },
        ...(others.length ? [{ href: '#more', label: 'More' }] : []),
      ]} />

      <h1>Projects</h1>
      <p>Things I&apos;ve built — hardware, software, and everything in between.</p>

      {featured.length > 0 && (
        <section id="featured" className="projectsPageSection">
          <h2>Featured work</h2>
          <div>
            {featured.map((p, i) => (
              <ProjectCard key={p._id} project={p} index={i} isLast={i === featured.length - 1} />
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section id="more" className="projectsPageSection">
          <h2>More projects</h2>
          <div>
            {others.map((p, i) => (
              <ProjectCard key={p._id} project={p} index={i} isLast={i === others.length - 1} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

function ProjectCard({ project: p, index, isLast }: { project: ProjectSummary; index: number; isLast: boolean }) {
  const imgSrc = resolveImage(p.previewImage, 300)
  const num = String(index + 1).padStart(2, '0')

  return (
    <Link href={`/projects/${p.slug.current}`}>
      <div className={`projectContainer${isLast ? ' last' : ''}`}>
        <div className="projectContainerSpacer" />
        <div className="projectContainerNumber">{num}</div>
        <div className="projectContainerText">
          {p.label && <p className="projectLabel">{p.label}</p>}
          <h3>{p.title}</h3>
          {p.hook && <h4>{p.hook}</h4>}
          {p.description && <p>{p.description}</p>}
        </div>
        {imgSrc && (
          <div className="projectContainerImage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgSrc} alt={p.previewImage?.alt ?? p.title} />
          </div>
        )}
        <div className="projectContainerArrow" />
      </div>
    </Link>
  )
}
