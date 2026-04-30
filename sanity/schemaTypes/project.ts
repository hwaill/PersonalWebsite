import { defineType, defineField, defineArrayMember } from 'sanity'

const imageBlock = defineArrayMember({
  type: 'object',
  name: 'imageBlock',
  title: 'Image',
  fields: [
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
    defineField({
      name: 'layout',
      type: 'string',
      options: { list: ['full', 'left', 'right'], layout: 'radio' },
      initialValue: 'full',
    }),
    defineField({ name: 'caption', type: 'string' }),
  ],
  preview: { select: { media: 'image', subtitle: 'caption' }, prepare: ({ media, subtitle }) => ({ title: 'Image', media, subtitle }) },
})

const imageGrid = defineArrayMember({
  type: 'object',
  name: 'imageGrid',
  title: 'Image Grid',
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
          defineField({ name: 'caption', type: 'string' }),
        ],
      })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Image Grid' }) },
})

const videoEmbed = defineArrayMember({
  type: 'object',
  name: 'videoEmbed',
  title: 'Video',
  fields: [
    defineField({ name: 'url', type: 'url', title: 'YouTube / Vimeo URL', validation: r => r.required() }),
    defineField({ name: 'caption', type: 'string' }),
  ],
  preview: { select: { subtitle: 'url' }, prepare: ({ subtitle }) => ({ title: 'Video', subtitle }) },
})

const quoteBlock = defineArrayMember({
  type: 'object',
  name: 'quoteBlock',
  title: 'Quote',
  fields: [
    defineField({ name: 'text', type: 'text', validation: r => r.required() }),
    defineField({ name: 'attribution', type: 'string' }),
  ],
  preview: { select: { subtitle: 'text' }, prepare: ({ subtitle }) => ({ title: 'Quote', subtitle }) },
})

const cardBlock = defineArrayMember({
  type: 'object',
  name: 'cardBlock',
  title: 'Card',
  fields: [
    defineField({
      name: 'cardType',
      type: 'string',
      options: { list: ['tech', 'link', 'info', 'highlight'], layout: 'radio' },
      initialValue: 'info',
    }),
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'body', type: 'text' }),
    defineField({ name: 'link', type: 'url' }),
  ],
  preview: { select: { title: 'title', subtitle: 'cardType' }, prepare: ({ title, subtitle }) => ({ title, subtitle: `Card: ${subtitle}` }) },
})

const subsectionContent = [
  defineArrayMember({ type: 'block' }),
  imageBlock,
  imageGrid,
  videoEmbed,
  quoteBlock,
  cardBlock,
]

const projectSubsection = defineArrayMember({
  type: 'object',
  name: 'projectSubsection',
  title: 'Subsection',
  fields: [
    defineField({ name: 'heading', type: 'string', validation: r => r.required() }),
    defineField({ name: 'content', type: 'array', of: subsectionContent }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Subsection' }) },
})

const projectSection = defineArrayMember({
  type: 'object',
  name: 'projectSection',
  title: 'Section',
  fields: [
    defineField({ name: 'heading', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'anchor',
      type: 'string',
      description: 'URL-safe id used for in-page nav links (e.g. "overview", "build-process")',
      validation: r => r.required().regex(/^[a-z0-9-]+$/, { name: 'slug', invert: false }),
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [defineArrayMember({ type: 'block' }), imageBlock, imageGrid, videoEmbed, quoteBlock, cardBlock, projectSubsection],
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Section' }) },
})

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({ name: 'hook', type: 'string', description: 'Short tagline shown on cards' }),
    defineField({ name: 'description', type: 'text', description: 'Summary paragraph' }),
    defineField({ name: 'year', type: 'number' }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'stack', type: 'array', of: [defineArrayMember({ type: 'string' })], description: 'Tech stack (optional)' }),
    defineField({ name: 'skills', type: 'array', of: [defineArrayMember({ type: 'string' })], description: 'Skills (optional)' }),
    defineField({ name: 'previewImage', type: 'image', title: 'Preview Image', description: 'Used on project cards/grid', options: { hotspot: true } }),
    defineField({ name: 'mainImage', type: 'image', title: 'Main Image', description: 'Hero image on project page', options: { hotspot: true } }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'featuredIndex', type: 'number', description: 'Order within featured projects (optional)' }),
    defineField({ name: 'disabled', type: 'boolean', initialValue: false }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Page Content',
      description: 'Full project page content built from sections',
      of: [projectSection],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'hook', media: 'previewImage' },
  },
  orderings: [
    { title: 'Featured Index', name: 'featuredIndexAsc', by: [{ field: 'featuredIndex', direction: 'asc' }] },
    { title: 'Year, Newest', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
})
