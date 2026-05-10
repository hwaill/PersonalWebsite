import { defineType, defineField, defineArrayMember } from 'sanity'

const orgLogo = [
  defineField({ name: 'sanityImage', type: 'image', title: 'Logo (Sanity upload)', options: { hotspot: true } }),
  defineField({ name: 'externalUrl', type: 'string', title: 'Logo URL', description: 'e.g. /img/homepage/resume/logoCU.svg or https://…' }),
]

const resumeSkill = defineArrayMember({
  type: 'object',
  name: 'resumeSkill',
  title: 'Skill',
  fields: [
    defineField({ name: 'name', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Value Type',
      options: {
        list: [
          { title: 'Number Scale (1–5)', value: 'numberScale' },
          { title: 'Word Scale (e.g. "Conversational")', value: 'wordScale' },
          { title: 'No Value', value: 'noValue' },
        ],
        layout: 'radio',
      },
      initialValue: 'numberScale',
      validation: r => r.required(),
    }),
    defineField({
      name: 'numberValue',
      type: 'number',
      title: 'Number (1–5)',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hidden: ({ parent }: any) => parent?.type !== 'numberScale',
      validation: r => r.min(1).max(5),
    }),
    defineField({
      name: 'wordValue',
      type: 'string',
      title: 'Word Value',
      description: 'e.g. "Conversational", "Fluent", "Native"',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hidden: ({ parent }: any) => parent?.type !== 'wordScale',
    }),
    defineField({ name: 'description', type: 'string', title: 'Description', description: 'e.g. specific technologies or tools' }),
  ],
  preview: {
    select: { title: 'name', type: 'type', num: 'numberValue', word: 'wordValue' },
    prepare: ({ title, type, num, word }) => ({
      title,
      subtitle: type === 'numberScale' ? `${num ?? '–'} / 5` : type === 'wordScale' ? word : '—',
    }),
  },
})

const resumeSkillCategory = defineArrayMember({
  type: 'object',
  name: 'resumeSkillCategory',
  title: 'Category',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Category Name', validation: r => r.required() }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Category Display',
      options: {
        list: [
          { title: 'Skill list', value: 'list' },
          { title: 'Single phrase', value: 'phrase' },
        ],
        layout: 'radio',
      },
      initialValue: 'list',
    }),
    defineField({
      name: 'phraseValue',
      type: 'string',
      title: 'Phrase',
      description: 'e.g. "Eligible to work in the U.S. with no restrictions."',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hidden: ({ parent }: any) => parent?.type !== 'phrase',
    }),
    defineField({
      name: 'skills',
      type: 'array',
      of: [resumeSkill],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hidden: ({ parent }: any) => parent?.type === 'phrase',
    }),
  ],
  preview: {
    select: { title: 'name', skills: 'skills', phrase: 'phraseValue' },
    prepare: ({ title, skills, phrase }) => ({
      title,
      subtitle: phrase ?? `${skills?.length ?? 0} skill${skills?.length !== 1 ? 's' : ''}`,
    }),
  },
})

const resumeSubSection = defineArrayMember({
  type: 'object',
  name: 'resumeSkillsSubSection',
  title: 'Sub-section',
  description: 'Categories that appear side-by-side in one column group',
  fields: [
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [resumeSkillCategory],
    }),
  ],
  preview: {
    select: { categories: 'categories' },
    prepare: ({ categories }) => ({
      title: categories?.map((c: { name?: string }) => c.name).join(', ') || 'Sub-section',
      subtitle: `${categories?.length ?? 0} categor${categories?.length !== 1 ? 'ies' : 'y'}`,
    }),
  },
})

const resumeExperience = defineArrayMember({
  type: 'object',
  name: 'resumeExperience',
  title: 'Experience',
  fields: [
    defineField({ name: 'org', type: 'string', title: 'Organization', validation: r => r.required() }),
    defineField({ name: 'position', type: 'string', title: 'Position / Role', validation: r => r.required() }),
    defineField({ name: 'location', type: 'string' }),
    defineField({
      name: 'date',
      type: 'string',
      title: 'Date / Date Range',
      description: 'e.g. "May 2024" or "October 2024–Present"',
    }),
    defineField({ name: 'logo', type: 'object', title: 'Logo', fields: orgLogo }),
    defineField({ name: 'logo2', type: 'object', title: 'Secondary Logo (optional)', fields: orgLogo }),
    defineField({
      name: 'descriptions',
      type: 'array',
      title: 'Bullet Points',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    select: { title: 'position', subtitle: 'org', media: 'logo.sanityImage' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle, media }),
  },
})

const resumeSection = defineArrayMember({
  type: 'object',
  name: 'resumeSection',
  title: 'Section',
  fields: [
    defineField({ name: 'heading', type: 'string', validation: r => r.required() }),
    defineField({ name: 'items', type: 'array', title: 'Items', of: [resumeExperience] }),
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare: ({ title, items }) => ({
      title,
      subtitle: `${items?.length ?? 0} item${items?.length !== 1 ? 's' : ''}`,
    }),
  },
})

export const resumeSchema = defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Document Title',
      description: 'Internal label only — used to identify this document in the Studio',
      initialValue: 'Resume',
    }),

    // ── Personal Info ────────────────────────────────────────────
    defineField({ name: 'fullName', type: 'string', title: 'Full Name' }),
    defineField({
      name: 'headline',
      type: 'string',
      title: 'Headline / Tagline',
      description: 'e.g. "Creative Developer & Designer"',
    }),
    defineField({ name: 'email', type: 'string', title: 'Email Address' }),
    defineField({ name: 'phone', type: 'string', title: 'Phone Number' }),
    defineField({ name: 'website', type: 'url', title: 'Personal Website' }),
    defineField({ name: 'location', type: 'string', title: 'Location', description: 'e.g. "Denver, CO"' }),

    // ── Main Sections ────────────────────────────────────────────
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Resume Sections',
      description: 'Ordered sections: Education, Work Experience, Leadership, etc.',
      of: [resumeSection],
    }),

    // ── Skills / Additional Information ──────────────────────────
    defineField({
      name: 'skillsSection',
      type: 'object',
      title: 'Skills / Additional Information',
      fields: [
        defineField({
          name: 'heading',
          type: 'string',
          title: 'Section Heading',
          initialValue: 'Additional Information',
        }),
        defineField({
          name: 'subSections',
          type: 'array',
          title: 'Sub-sections',
          description: 'Each sub-section is a column group of skill categories',
          of: [resumeSubSection],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'fullName', subtitle: 'headline' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Resume', subtitle }),
  },
})
