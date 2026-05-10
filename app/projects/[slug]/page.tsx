import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText, PortableTextComponents } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { projectBySlugQuery, projectsQuery } from '@/sanity/lib/queries'
import { urlFor, resolveImage } from '@/sanity/lib/image'
import { NavLinksRegistrar } from '@/app/components/nav/NavLinksRegistrar'
import type { Metadata } from 'next'

// Pre-generate slugs at build time
export async function generateStaticParams() {
  const projects = await client.fetch(projectsQuery)
  return projects.map((p: { slug: { current: string } }) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch(projectBySlugQuery, { slug })
  if (!project) return {}
  return { title: project.title, description: project.hook || project.description }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await client.fetch(projectBySlugQuery, { slug })
  if (!project) notFound()

  const navLinks = [
    ...(project.highlights?.length ? [{ href: '#highlights', label: 'Highlights' }] : []),
    ...(project.body ?? []).map((s: { anchor: string; heading: string; navLabel?: string }) => ({
      href: `#${s.anchor}`,
      label: s.navLabel || s.heading,
    })),
  ]

  return (
    <main className="pageContent">
      <NavLinksRegistrar links={navLinks} />

      {/* ── Hero ── */}
      <section id="hero" className="projectHero">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logos/logoFlatTight.svg"
            alt="Henry Waill"
            className="projectHeroLogo"
            data-nav-hero=""
          />
        </Link>
        {project.label && <p className="projectLabel">{project.label}</p>}
        <h1 className="title">{project.title}</h1>
        {project.hook && <h2 className="projectHook">{project.hook}</h2>}
        {project.tags?.length > 0 && (
          <div className="projectMeta">
            {project.tags.map((tag: { label: string; value: string }, i: number) => (
              <div key={i} className="metaItem">
                <span className="metaLabel">{tag.label}</span>
                <span className="metaValue">{tag.value}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Main image ── */}
      {(() => {
        // const mainImgSrc = resolveImage(project.mainImage)
        // return mainImgSrc ? (
        //   <div className="projectMainImage">
        //     {/* eslint-disable-next-line @next/next/no-img-element */}
        //     <img src={mainImgSrc} alt={project.mainImage?.alt ?? project.title} />
        //   </div>
        // ) : null
      })()}

      {/* ── Highlights ── */}
      {project.highlights?.length > 0 && (
        <section id="highlights" className="projectHighlights">
          <p className="highlightsLabel">At a glance</p>
          <div className="highlightsGrid">
            {project.highlights.map((h: { heading: string; subheading: string; description?: string }, i: number) => (
              <div key={i} className="highlightItem">
                <span className="highlightNumber">{h.heading}</span>
                <span className="highlightTitle">{h.subheading}</span>
                {h.description && <span className="highlightDesc">{h.description}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Body sections ── */}
      {project.body?.map((section: ProjectSection) => (
        <section key={section.anchor} id={section.anchor} className="projectSection">
          <h1>{section.heading}</h1>
          <div className="sectionContent">
            <ContentBlocks content={section.content} />
          </div>
        </section>
      ))}
    </main>
  )
}

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */

type ProjectSection = {
  heading: string
  anchor: string
  content: ContentBlock[]
}

type ContentBlock = {
  _type: string
  _key: string
  [key: string]: unknown
}

/* ─────────────────────────────────────────
   Content block renderer
───────────────────────────────────────── */

function ContentBlocks({ content }: { content: ContentBlock[] }) {
  if (!content?.length) return null
  return (
    <>
      {content.map((block) => (
        <ContentBlock key={block._key} block={block} />
      ))}
    </>
  )
}

function ContentBlock({ block }: { block: ContentBlock }) {
  switch (block._type) {
    case 'block':
      return <PortableTextBlock block={block} />
    case 'imageBlock':
      return <ImageBlock block={block} />
    case 'imageGrid':
      return <ImageGridBlock block={block} />
    case 'videoEmbed':
      return <VideoBlock block={block} />
    case 'quoteBlock':
      return <QuoteBlock block={block} />
    case 'asideBlock':
      return <AsideBlock block={block} />
    case 'teamBlock':
      return <TeamBlock block={block} />
    case 'projectSubsection':
      return <Subsection block={block} />
    default:
      return null
  }
}

/* ─────────────────────────────────────────
   Portable text (rich text blocks)
───────────────────────────────────────── */

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => (
      <div className="pullQuote">
        <blockquote>{children}</blockquote>
      </div>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
    em: ({ children }) => <em>{children}</em>,
    strong: ({ children }) => <strong>{children}</strong>,
  },
}

function PortableTextBlock({ block }: { block: ContentBlock }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PortableText value={[block as any]} components={portableTextComponents} />
}

/* ─────────────────────────────────────────
   Image block
───────────────────────────────────────── */

type SanityImageSource = { asset?: { _ref?: string; url?: string }; [key: string]: unknown }

function ImageBlock({ block }: { block: ContentBlock }) {
  const b = block as {
    sanityImage?: SanityImageSource
    externalUrl?: string
    alt?: string
    caption?: string
    layout?: 'full' | 'left' | 'right'
    partialWidth?: 'half' | 'third'
  }

  const src = resolveImage({ sanityImage: b.sanityImage, externalUrl: b.externalUrl })
  if (!src) return null

  const layout = b.layout ?? 'full'
  const sizeClass = b.partialWidth === 'third' ? ' third' : ''

  if (layout === 'left') {
    return (
      <>
        <div className={`imgPartialLeft${sizeClass}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={b.alt ?? ''} loading="lazy" />
        </div>
        {b.caption && <p className="imgCaption" style={{ clear: 'none' }}>{b.caption}</p>}
      </>
    )
  }

  if (layout === 'right') {
    return (
      <>
        <div className={`imgPartialRight${sizeClass}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={b.alt ?? ''} loading="lazy" />
        </div>
        {b.caption && <p className="imgCaption" style={{ clear: 'none' }}>{b.caption}</p>}
      </>
    )
  }

  // Full width
  return (
    <>
      <div className="imgFull">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={b.alt ?? ''} loading="lazy" />
      </div>
      {b.caption && <p className="imgCaption">{b.caption}</p>}
    </>
  )
}

/* ─────────────────────────────────────────
   Image grid block
───────────────────────────────────────── */

type GridImage = {
  _key: string
  sanityImage?: { asset?: { metadata?: { dimensions?: { aspectRatio?: number } } } }
  externalUrl?: string
  alt?: string
  caption?: string
}

function ImageGridBlock({ block }: { block: ContentBlock }) {
  const b = block as { images?: GridImage[]; caption?: string }
  if (!b.images?.length) return null

  return (
    <>
      <div className="imgGrid">
        {b.images.map((img) => {
          const src = resolveImage({ sanityImage: img.sanityImage as SanityImageSource, externalUrl: img.externalUrl }, 800)
          if (!src) return null
          const ar = img.sanityImage?.asset?.metadata?.dimensions?.aspectRatio ?? 1.5
          return (
            <div key={img._key} className="imgGridItem" style={{ '--ar': ar } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={img.alt ?? ''} loading="lazy" />
            </div>
          )
        })}
      </div>
      {b.caption && <p className="imgCaption">{b.caption}</p>}
    </>
  )
}

/* ─────────────────────────────────────────
   Video block
───────────────────────────────────────── */

function getVideoEmbed(url: string): { type: 'iframe' | 'video'; src: string } {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (yt) return { type: 'iframe', src: `https://www.youtube.com/embed/${yt[1]}` }

  const vm = url.match(/vimeo\.com\/(\d+)/)
  if (vm) return { type: 'iframe', src: `https://player.vimeo.com/video/${vm[1]}` }

  return { type: 'video', src: url }
}

function VideoBlock({ block }: { block: ContentBlock }) {
  const b = block as {
    url?: string
    sanityFile?: { asset?: { url?: string } }
    thumbnail?: SanityImageSource
    thumbnailUrl?: string
    caption?: string
  }

  const src = b.sanityFile?.asset?.url ?? b.url
  if (!src) return null

  const isSanityFile = !!b.sanityFile?.asset?.url
  const embed = isSanityFile ? { type: 'video' as const, src } : getVideoEmbed(src)

  let poster: string | undefined
  if (b.thumbnailUrl) {
    poster = b.thumbnailUrl
  } else if (b.thumbnail) {
    try { poster = urlFor(b.thumbnail).width(1200).url() } catch { /* no poster */ }
  }

  return (
    <>
      <div className="videoBlock">
        <div className="videoInner">
          {embed.type === 'iframe' ? (
            <iframe src={embed.src} allowFullScreen title={b.caption ?? 'Video'} />
          ) : (
            <video controls src={embed.src} poster={poster} />
          )}
        </div>
      </div>
      {b.caption && <p className="imgCaption">{b.caption}</p>}
    </>
  )
}

/* ─────────────────────────────────────────
   Quote block
───────────────────────────────────────── */

function QuoteBlock({ block }: { block: ContentBlock }) {
  const b = block as unknown as { text: string; attribution?: string }
  return (
    <div className="pullQuote">
      <blockquote>&ldquo;{b.text}&rdquo;</blockquote>
      {b.attribution && <cite>{b.attribution}</cite>}
    </div>
  )
}

/* ─────────────────────────────────────────
   Aside / callout block
───────────────────────────────────────── */

function AsideBlock({ block }: { block: ContentBlock }) {
  const b = block as unknown as { cards: Array<{ _key: string; heading?: string; body: string }> }
  if (!b.cards?.length) return null

  const count = Math.min(b.cards.length, 4)
  const countClass = `count${count}`

  return (
    <div className={`asideGrid ${countClass}`}>
      {b.cards.map((card) => (
        <div key={card._key} className="asideCard">
          {card.heading && <h4>{card.heading}</h4>}
          <p>{card.body}</p>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   Team block
───────────────────────────────────────── */

function TeamBlock({ block }: { block: ContentBlock }) {
  const b = block as unknown as {
    members: Array<{
      _key: string
      name: string
      role?: string
      sanityPhoto?: SanityImageSource
      externalPhotoUrl?: string
      link?: string
    }>
  }
  if (!b.members?.length) return null

  return (
    <div className="teamGrid">
      {b.members.map((m) => {
        const photoSrc = resolveImage({ sanityImage: m.sanityPhoto, externalUrl: m.externalPhotoUrl }, 120)
        const initials = m.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
        return (
          <div key={m._key} className="teamCard">
            <div className="teamAvatar">
              {photoSrc
                ? <img src={photoSrc} alt={m.name} loading="lazy" />
                : <div className="teamAvatarInitials">{initials}</div>
              }
            </div>
            <div className="teamInfo">
              <span className="teamName">{m.name}</span>
              {m.role && <span className="teamRole">{m.role}</span>}
              {m.link && (
                <a className="teamLink" href={m.link} target="_blank" rel="noopener noreferrer">
                  Visit portfolio ↗
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────
   Subsection (h3 + recursive content)
───────────────────────────────────────── */

function Subsection({ block }: { block: ContentBlock }) {
  const b = block as unknown as { heading: string; content: ContentBlock[] }
  return (
    <>
      <h2>{b.heading}</h2>
      <ContentBlocks content={b.content} />
    </>
  )
}
