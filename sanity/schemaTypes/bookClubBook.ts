import { defineType, defineField } from 'sanity'

export const bookClubBookSchema = defineType({
  name: 'bookClubBook',
  title: 'Book Club Book',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'author', type: 'string', validation: r => r.required() }),
    defineField({ name: 'pages', type: 'number', title: 'Pages' }),
    defineField({ name: 'yearPublished', type: 'number', title: 'Year Published' }),
    defineField({
      name: 'genre',
      type: 'string',
      options: { list: [{ title: 'Fiction', value: 'fiction' }, { title: 'Nonfiction', value: 'nonfiction' }], layout: 'radio' },
    }),
    defineField({ name: 'inProgress', type: 'boolean', initialValue: false }),
    defineField({ name: 'dateCompleted', type: 'date'}),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'object',
      fields: [
        defineField({ name: 'sanityImage', type: 'image', title: 'Upload', options: { hotspot: true } }),
        defineField({ name: 'externalUrl', type: 'string', title: 'External or internal URL', description: 'Overrides upload if set. Use https://… or /img/…' }),
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
    defineField({
      name: 'mvp',
      title: 'MVP',
      type: 'reference',
      to: [{ type: 'bookClubMember' }],
      description: 'Most Valuable Player for this book',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'author', media: 'coverImage.sanityImage' },
  },
  orderings: [
    { title: 'Title A–Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
})
