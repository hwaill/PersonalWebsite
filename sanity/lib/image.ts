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
    try { return urlFor(image.sanityImage).width(width).url() } catch { return null }
  }
  return null
}
