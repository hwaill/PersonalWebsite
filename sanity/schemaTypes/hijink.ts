import { defineType, defineField } from 'sanity'

export const hijinkSchema = defineType({
  name: 'hijink',
  title: 'Hijink',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'label',
      type: 'string',
      description: 'Shown above the title in small caps, e.g. "YouTube Channel"',
    }),
    defineField({ name: 'hook', type: 'string', description: 'Short subtitle shown on the card' }),
    defineField({ name: 'description', type: 'text', description: 'Summary paragraph' }),
    defineField({
      name: 'previewImage',
      type: 'object',
      title: 'Preview Image',
      fields: [
        defineField({ name: 'sanityImage', type: 'image', title: 'Sanity upload', options: { hotspot: true } }),
        defineField({ name: 'externalUrl', type: 'string', title: 'External or internal URL', description: 'Overrides upload if set. Use https://… or /img/…' }),
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
    defineField({
      name: 'destinationLink',
      type: 'string',
      title: 'Destination Link',
      description: 'Where the card links to. Use a full URL for external links (https://…) or a path for internal links (/bookclub).',
      validation: r => r.required(),
    }),
    defineField({ name: 'displayIndex', type: 'number', description: 'Order in the Other Hijinks section' }),
    defineField({ name: 'disabled', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'hook', media: 'previewImage.sanityImage' },
  },
  orderings: [
    { title: 'Display Index', name: 'displayIndexAsc', by: [{ field: 'displayIndex', direction: 'asc' }] },
  ],
})
