import { defineType, defineField } from 'sanity'

export const bookClubRatingSchema = defineType({
  name: 'bookClubRating',
  title: 'Book Club Rating',
  type: 'document',
  fields: [
    defineField({ name: 'book', type: 'reference', to: [{ type: 'bookClubBook' }], validation: r => r.required() }),
    defineField({ name: 'member', type: 'reference', to: [{ type: 'bookClubMember' }], validation: r => r.required() }),
    defineField({
      name: 'value',
      type: 'number',
      validation: r => r.required().min(0).max(10),
      description: 'Rating out of 10',
    }),
  ],
  preview: {
    select: { bookTitle: 'book.title', memberName: 'member.name', value: 'value' },
    prepare: ({ bookTitle, memberName, value }) => ({
      title: `${memberName} → ${bookTitle}`,
      subtitle: `Rating: ${value}`,
    }),
  },
})
