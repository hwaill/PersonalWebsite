import { defineType, defineField } from 'sanity'

export const bookClubBookSchema = defineType({
  name: 'bookClubBook',
  title: 'Book Club Book',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'author', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'genre',
      type: 'string',
      options: { list: [{ title: 'Fiction', value: 'fiction' }, { title: 'Nonfiction', value: 'nonfiction' }], layout: 'radio' },
    }),
    defineField({ name: 'inProgress', type: 'boolean', initialValue: false }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'mvp',
      title: 'MVP',
      type: 'reference',
      to: [{ type: 'bookClubMember' }],
      description: 'Most Valuable Player for this book',
    }),
    defineField({
      name: 'review',
      type: 'array',
      title: 'My Review',
      description: 'Personal review (not per-member)',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'author', media: 'coverImage' },
  },
  orderings: [
    { title: 'Title A–Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
})
