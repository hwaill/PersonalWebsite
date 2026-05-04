import { defineType, defineField } from 'sanity'

export const bookClubMemberSchema = defineType({
  name: 'bookClubMember',
  title: 'Book Club Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'tagline', type: 'string', title: 'Tagline' }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
  ],
  preview: {
    select: { title: 'name', media: 'photo' },
  },
})
