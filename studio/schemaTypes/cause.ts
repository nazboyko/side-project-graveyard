import {defineField, defineType} from 'sanity'

export const cause = defineType({
  name: 'cause',
  title: 'Cause of death',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('A cause of death needs a name.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) =>
        rule.required().error('The cause needs an address. Generate a slug from the title.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'One or two sentences, as the keeper would say them.',
      type: 'text',
      rows: 2,
      validation: (rule) => [
        rule.required().error('Say a few words about how this one takes them.'),
        rule.max(240).error('Keep the description under 240 characters.'),
      ],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description: 'An emoji or a very short mark. Shown as decoration only.',
      type: 'string',
      validation: (rule) => rule.max(4).error('The icon is four characters at most.'),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})
