import { defineType, defineField, defineArrayMember } from 'sanity'

const imageBlock = defineArrayMember({
  type: 'object',
  name: 'imageBlock',
  title: 'Image',
  fields: [
    defineField({ name: 'sanityImage', type: 'image', title: 'Sanity upload', options: { hotspot: true } }),
    defineField({ name: 'externalUrl', type: 'string', title: 'External or internal URL', description: 'Overrides upload if set. Use https://… or /img/…' }),
    defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
    defineField({
      name: 'layout',
      type: 'string',
      options: { list: [
        { title: 'Full width', value: 'full' },
        { title: 'Float left', value: 'left' },
        { title: 'Float right', value: 'right' },
      ], layout: 'radio' },
      initialValue: 'full',
    }),
    defineField({
      name: 'partialWidth',
      title: 'Float width',
      type: 'string',
      options: {
        list: [
          { title: '1/2 width', value: 'half' },
          { title: '1/3 width', value: 'third' },
        ],
        layout: 'radio',
      },
      initialValue: 'half',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hidden: ({ parent }: any) => !parent?.layout || parent?.layout === 'full',
    }),
    defineField({ name: 'caption', type: 'string' }),
  ],
  preview: {
    select: { media: 'sanityImage', subtitle: 'caption', url: 'externalUrl' },
    prepare: ({ media, subtitle, url }) => ({ title: 'Image', media, subtitle: subtitle || url }),
  },
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
          defineField({ name: 'sanityImage', type: 'image', title: 'Sanity upload', options: { hotspot: true } }),
          defineField({ name: 'externalUrl', type: 'string', title: 'External or internal URL' }),
          defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
          defineField({ name: 'caption', type: 'string' }),
        ],
        preview: {
          select: { media: 'sanityImage', title: 'caption', url: 'externalUrl' },
          prepare: ({ media, title, url }) => ({ title: title || url || 'Image', media }),
        },
      })],
    }),
    defineField({ name: 'caption', type: 'string', title: 'Group caption (optional)' }),
  ],
  preview: { prepare: () => ({ title: 'Image Grid' }) },
})

const videoEmbed = defineArrayMember({
  type: 'object',
  name: 'videoEmbed',
  title: 'Video',
  fields: [
    defineField({ name: 'url', type: 'string', title: 'YouTube / Vimeo URL or internal path', description: 'e.g. https://youtu.be/… or /video/demo.mp4' }),
    defineField({ name: 'sanityFile', type: 'file', title: 'Upload video to Sanity', options: { accept: 'video/*' } }),
    defineField({ name: 'thumbnail', type: 'image', title: 'Thumbnail (upload)', options: { hotspot: true } }),
    defineField({ name: 'thumbnailUrl', type: 'string', title: 'Thumbnail URL (link)', description: 'External or internal URL. Overrides upload if set.' }),
    defineField({ name: 'caption', type: 'string' }),
  ],
  preview: { select: { subtitle: 'url', media: 'thumbnail' }, prepare: ({ subtitle, media }) => ({ title: 'Video', subtitle, media }) },
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

const asideBlock = defineArrayMember({
  type: 'object',
  name: 'asideBlock',
  title: 'Aside / Callout',
  fields: [
    defineField({
      name: 'cards',
      type: 'array',
      title: 'Cards',
      description: 'Add 1 for a single callout, 2–3 for a side-by-side grid',
      validation: r => r.required().min(1),
      of: [defineArrayMember({
        type: 'object',
        name: 'asideCard',
        title: 'Card',
        fields: [
          defineField({ name: 'heading', type: 'string', title: 'Heading (optional)' }),
          defineField({ name: 'body', type: 'text', validation: r => r.required() }),
        ],
        preview: {
          select: { title: 'heading', subtitle: 'body' },
          prepare: ({ title, subtitle }) => ({ title: title || 'Card', subtitle }),
        },
      })],
    }),
  ],
  preview: {
    select: { cards: 'cards' },
    prepare: ({ cards }) => ({ title: `Aside (${cards?.length ?? 0} card${cards?.length !== 1 ? 's' : ''})` }),
  },
})

const teamBlock = defineArrayMember({
  type: 'object',
  name: 'teamBlock',
  title: 'Team',
  fields: [
    defineField({
      name: 'members',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        name: 'teamMember',
        title: 'Team Member',
        fields: [
          defineField({ name: 'name', type: 'string', validation: r => r.required() }),
          defineField({ name: 'role', type: 'string' }),
          defineField({ name: 'sanityPhoto', type: 'image', title: 'Photo (Sanity upload)', options: { hotspot: true } }),
          defineField({ name: 'externalPhotoUrl', type: 'string', title: 'Photo URL (external or internal)' }),
          defineField({ name: 'link', type: 'url', title: 'Profile link (optional)' }),
        ],
        preview: { select: { title: 'name', subtitle: 'role', media: 'sanityPhoto' } },
      })],
    }),
  ],
  preview: {
    select: { members: 'members' },
    prepare: ({ members }) => ({ title: `Team (${members?.length ?? 0} members)` }),
  },
})

const subsectionContent = [
  defineArrayMember({ type: 'block' }),
  imageBlock,
  imageGrid,
  videoEmbed,
  quoteBlock,
  asideBlock,
  teamBlock,
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
      description: 'URL-safe id for nav links (e.g. "overview", "build-process")',
      validation: r => r.required().regex(/^[a-z0-9-]+$/, { name: 'slug', invert: false }),
    }),
    defineField({
      name: 'navLabel',
      type: 'string',
      title: 'Nav label (optional)',
      description: 'Short label shown in the side rail (1–2 words). Defaults to the section heading if not set.',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [defineArrayMember({ type: 'block' }), imageBlock, imageGrid, videoEmbed, quoteBlock, asideBlock, teamBlock, projectSubsection],
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
    defineField({
      name: 'label',
      type: 'string',
      title: 'Project Label',
      description: 'Shown above the title in small caps, e.g. "Senior Capstone Project"',
    }),
    defineField({ name: 'hook', type: 'string', description: 'Short subtitle shown on cards and project page' }),
    defineField({ name: 'description', type: 'text', description: 'Summary paragraph' }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Meta tags',
      description: 'Label/value pairs shown below the title, e.g. {label: "Role", value: "Hardware"}',
      of: [defineArrayMember({
        type: 'object',
        name: 'tag',
        title: 'Tag',
        fields: [
          defineField({ name: 'label', type: 'string', validation: r => r.required() }),
          defineField({ name: 'value', type: 'string', validation: r => r.required() }),
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      })],
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      title: 'Highlights ("At a glance")',
      description: 'Shown in the dark strip below the hero',
      of: [defineArrayMember({
        type: 'object',
        name: 'highlight',
        title: 'Highlight',
        fields: [
          defineField({ name: 'heading', type: 'string', title: 'Stat / Number', description: 'Large display text, e.g. "4" or "PCB"', validation: r => r.required() }),
          defineField({ name: 'subheading', type: 'string', title: 'Title', validation: r => r.required() }),
          defineField({ name: 'description', type: 'text', title: 'Description' }),
        ],
        preview: { select: { title: 'heading', subtitle: 'subheading' } },
      })],
    }),
    defineField({
      name: 'previewImage',
      type: 'object',
      title: 'Preview Image',
      description: 'Used on project cards/grid',
      fields: [
        defineField({ name: 'sanityImage', type: 'image', title: 'Sanity upload', options: { hotspot: true } }),
        defineField({ name: 'externalUrl', type: 'string', title: 'External or internal URL', description: 'Overrides upload if set. Use https://… or /img/…' }),
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
    defineField({
      name: 'mainImage',
      type: 'object',
      title: 'Main Image',
      description: 'Hero image on project page',
      fields: [
        defineField({ name: 'sanityImage', type: 'image', title: 'Sanity upload', options: { hotspot: true } }),
        defineField({ name: 'externalUrl', type: 'string', title: 'External or internal URL', description: 'Overrides upload if set. Use https://… or /img/…' }),
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
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
    select: { title: 'title', subtitle: 'hook', media: 'previewImage.sanityImage' },
  },
  orderings: [
    { title: 'Featured Index', name: 'featuredIndexAsc', by: [{ field: 'featuredIndex', direction: 'asc' }] },
    { title: 'Year, Newest', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
})
