import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site title',
      type: 'string',
      validation: (rule) => rule.required().error('The graveyard needs a name on the gate.'),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (rule) => rule.required().error('The gate needs a line under the name.'),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      description: 'What the keeper says at the gate. Two short paragraphs.',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'keeperName',
      title: 'Keeper',
      description: 'Who looks after the place.',
      type: 'string',
    }),
    defineField({
      name: 'footerLine',
      title: 'Footer line',
      type: 'string',
    }),
    defineField({
      name: 'backdrop',
      title: 'Scene backdrop override',
      description: 'Optional image for the gate and memorial sky. Crop and hotspot guide both screen sizes; the local dusk scene is used when empty.',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'tagline'},
  },
})
