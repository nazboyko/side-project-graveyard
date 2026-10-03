import {defineField, defineType} from 'sanity'

export const tech = defineType({
  name: 'tech',
  title: 'Tech',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().error('The tool needs a name.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) =>
        rule.required().error('The tool needs an address. Generate a slug from the name.'),
    }),
    defineField({
      name: 'color',
      title: 'Colour',
      description: 'Text colour of the chip. It has to stay readable on a dark stone.',
      type: 'string',
      validation: (rule) => [
        rule.required().error('The chip needs a colour.'),
        rule
          .regex(/^#[0-9a-fA-F]{6}$/, {name: 'hex colour'})
          .error('A colour is a # and six hex digits, like #f5c451.'),
      ],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'color'},
  },
})
