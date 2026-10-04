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
    defineField({
      name: 'motif',
      title: 'Mark on the plot',
      description: 'How this cause shows on every grave it took. The site draws it; nothing is uploaded.',
      type: 'string',
      options: {
        list: [
          {title: 'Overgrown: weeds, a leaning stone, a fallen leaf', value: 'overgrown'},
          {title: 'Annexes: a second stone and an extra plaque bolted on', value: 'annexes'},
          {title: 'Signpost: an arrow in the ground, pointing somewhere newer', value: 'signpost'},
          {title: 'Briefcase: left at the foot of the stone', value: 'briefcase'},
          {title: 'Vines: something wrapped around it and would not let go', value: 'vines'},
          {title: 'Laurel: a carved sprig and fresh flowers', value: 'laurel'},
          {title: 'Empty plot: space on every side, one wilted flower', value: 'emptyPlot'},
          {title: 'Layers: older stones still showing underneath', value: 'layers'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Every cause leaves a mark on the stone. Pick one.'),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})
