import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source)
}

type ProjectImageField = {
  sanityImage?: unknown
  externalUrl?: string
} | undefined

export function resolveImage(image: ProjectImageField, width = 1200): string | null {
  if (!image) return null
  if (image.externalUrl) return image.externalUrl
  if (image.sanityImage) {
    try { return urlFor(image.sanityImage).width(width).auto('format').quality(85).url() } catch { return null }
  }
  return null
}

// Resolves book cover images — handles both the new { sanityImage, externalUrl }
// object format and old direct Sanity image references (backward compat).
export function resolveCoverImage(coverImage: unknown, width = 400): string | null {
  if (!coverImage || typeof coverImage !== 'object') return null
  const ci = coverImage as Record<string, unknown>
  if ('sanityImage' in ci || 'externalUrl' in ci) {
    if (ci.externalUrl && typeof ci.externalUrl === 'string') return ci.externalUrl
    if (ci.sanityImage) {
      try { return urlFor(ci.sanityImage as Parameters<typeof urlFor>[0]).width(width).auto('format').quality(85).url() } catch { return null }
    }
    return null
  }
  // Old format: direct Sanity image asset reference
  try { return urlFor(ci as Parameters<typeof urlFor>[0]).width(width).auto('format').quality(85).url() } catch { return null }
}
