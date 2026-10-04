import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Grave',
  type: 'document',
  groups: [
    {name: 'stone', title: 'Stone', default: true},
    {name: 'autopsy', title: 'Autopsy'},
    {name: 'story', title: 'Story'},
    {name: 'monument', title: 'Monument'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'stone',
      validation: (rule) => rule.required().error('Every stone needs a name.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'stone',
      options: {source: 'name', maxLength: 96},
      validation: (rule) =>
        rule.required().error('The grave needs an address. Generate a slug from the name.'),
    }),
    defineField({
      name: 'epitaph',
      title: 'Epitaph',
      description: 'One line, carved, not blogged.',
      type: 'string',
      group: 'stone',
      validation: (rule) => [
        rule.required().error('A stone with nothing carved on it is just a rock.'),
        rule.max(120).error('An epitaph longer than 120 characters will not fit on the stone.'),
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'stone',
      options: {
        list: [
          {title: 'Buried (abandoned)', value: 'buried'},
          {title: 'Retired (shipped, closed with honour)', value: 'retired'},
          {title: 'Undead ("will get back to it")', value: 'undead'},
        ],
        layout: 'radio',
      },
      initialValue: 'buried',
      validation: (rule) =>
        rule.required().error('Buried, retired or undead. The ledger needs to know.'),
    }),
    defineField({
      name: 'bornAt',
      title: 'Born',
      description: 'The day of the first commit.',
      type: 'date',
      group: 'stone',
      validation: (rule) => rule.required().error('Every project was born on some day. Write it down.'),
    }),
    defineField({
      name: 'diedAt',
      title: 'Died',
      description: 'The day of the last commit. The undead may leave this empty.',
      type: 'date',
      group: 'stone',
      validation: (rule) =>
        rule.custom<string>((diedAt, context) => {
          const status = context.document?.status
          const bornAt = context.document?.bornAt
          if (!diedAt) {
            return status === 'undead' ? true : 'Only the undead may go without a date of death.'
          }
          // Both are ISO dates (YYYY-MM-DD), so string order is date order.
          if (typeof bornAt === 'string' && diedAt < bornAt) {
            return 'A project cannot die before it is born.'
          }
          return true
        }),
    }),
    defineField({
      name: 'cause',
      title: 'Cause of death',
      type: 'reference',
      to: [{type: 'cause'}],
      group: 'autopsy',
      validation: (rule) => rule.required().error('Every grave needs a cause of death.'),
    }),
    defineField({
      name: 'stack',
      title: 'Stack',
      description: 'What it was built with. One to eight tools.',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'tech'}]})],
      group: 'autopsy',
      validation: (rule) => [
        rule.required().min(1).error('It was built with something. Name at least one tool.'),
        rule.max(8).error('More than eight tools will not fit on the plaque.'),
        rule.unique().error('The same tool is listed twice.'),
      ],
    }),
    defineField({
      name: 'lastCommit',
      title: 'Last commit message',
      description: 'Exactly as it was written.',
      type: 'string',
      group: 'autopsy',
      validation: (rule) =>
        rule.max(80).error('The last commit message runs past 80 characters. Trim it.'),
    }),
    defineField({
      name: 'moodAtDeath',
      title: 'Mood at death',
      type: 'string',
      group: 'autopsy',
      options: {
        list: [
          {title: 'Relief', value: 'relief'},
          {title: 'Guilt', value: 'guilt'},
          {title: 'Denial', value: 'denial'},
          {title: 'Peace', value: 'peace'},
        ],
      },
    }),
    defineField({
      name: 'linesOfCode',
      title: 'Lines of code',
      type: 'number',
      group: 'autopsy',
      validation: (rule) =>
        rule.integer().min(0).error('Lines of code are counted in whole numbers, zero or more.'),
    }),
    defineField({
      name: 'obituary',
      title: 'Obituary',
      description: 'What it was, what happened, the last day. Two to four short paragraphs.',
      type: 'array',
      group: 'story',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
          },
        }),
      ],
      validation: (rule) =>
        rule.max(4).warning('The keeper reads obituaries aloud. Four paragraphs is plenty.'),
    }),
    defineField({
      name: 'lesson',
      title: 'What it taught me',
      description: 'One idea. No moral of the story.',
      type: 'text',
      rows: 3,
      group: 'story',
      validation: (rule) => [
        rule.required().error('It taught something. One sentence will do.'),
        rule.max(200).error('A lesson is one idea. Keep it under 200 characters.'),
      ],
    }),
    defineField({
      name: 'repoUrl',
      title: 'Repository',
      description: 'Where the ruins can be visited, if they still stand.',
      type: 'url',
      group: 'story',
      validation: (rule) =>
        rule.uri({scheme: ['https']}).error('The ruins must be reachable over https.'),
    }),
    defineField({
      name: 'monument',
      title: 'Monument',
      description:
        'Everything here is optional. The stone already follows from the dates, the status and the cause.',
      type: 'object',
      group: 'monument',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'shape',
          title: 'Shape',
          description: 'Leave empty and the keeper chooses from the dates.',
          type: 'string',
          options: {
            list: [
              {title: 'Arch', value: 'arch'},
              {title: 'Shoulder', value: 'shoulder'},
              {title: 'Gothic', value: 'gothic'},
              {title: 'Tablet', value: 'tablet'},
              {title: 'Obelisk', value: 'obelisk'},
              {title: 'Broken', value: 'broken'},
              {title: 'Marker (a low stone and a wooden tag)', value: 'marker'},
              {title: 'Plaque (a pale slab with a brass plate)', value: 'plaque'},
              {title: 'Mausoleum', value: 'mausoleum'},
            ],
          },
        }),
        defineField({
          name: 'relic',
          title: 'Relic',
          description: 'One object left at the grave.',
          type: 'string',
          options: {
            list: [
              {title: 'Shovel', value: 'shovel'},
              {title: 'Envelope', value: 'envelope'},
              {title: 'Umbrella', value: 'umbrella'},
              {title: 'Key', value: 'key'},
              {title: 'Coins', value: 'coins'},
              {title: 'Crates', value: 'crates'},
              {title: 'Puzzle piece', value: 'puzzlePiece'},
              {title: 'Guitar pick', value: 'guitarPick'},
              {title: 'Notes', value: 'notes'},
              {title: 'Server lights', value: 'serverLights'},
              {title: 'Collar tag', value: 'collarTag'},
              {title: 'Cup', value: 'cup'},
              {title: 'Chain link', value: 'chainLink'},
            ],
          },
        }),
        defineField({
          name: 'inscription',
          title: 'Inscription',
          description: 'A small carving found only up close. Set in monospace. Example: v1 → v2 → v3',
          type: 'string',
          validation: (rule) => rule.max(28).error('The mason charges by the letter. 28 at most.'),
        }),
        defineField({
          name: 'figures',
          title: 'Figures',
          description: 'Two or three numbers worth carving. Example: 21 / links, $2.10 / pledged',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'figure',
              title: 'Figure',
              type: 'object',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Number',
                  type: 'string',
                  validation: (rule) => [
                    rule.required().error('A figure needs its number.'),
                    rule.max(12).error('A figure is a number, not a sentence. 12 characters at most.'),
                  ],
                }),
                defineField({
                  name: 'label',
                  title: 'What it counts',
                  type: 'string',
                  validation: (rule) => [
                    rule.required().error('Say what the number counts.'),
                    rule.max(24).error('The label has to fit under the number. 24 characters at most.'),
                  ],
                }),
              ],
              preview: {select: {title: 'value', subtitle: 'label'}},
            }),
          ],
          validation: (rule) => rule.max(3).error('Three figures at most. A grave is not a dashboard.'),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Date of death, newest first',
      name: 'diedAtDesc',
      by: [{field: 'diedAt', direction: 'desc'}],
    },
    {
      title: 'Name, A to Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      causeTitle: 'cause.title',
      bornAt: 'bornAt',
      diedAt: 'diedAt',
    },
    prepare({title, causeTitle, bornAt, diedAt}) {
      const born = typeof bornAt === 'string' ? bornAt.slice(0, 4) : '?'
      const died = typeof diedAt === 'string' ? diedAt.slice(0, 4) : 'undead'
      return {
        title,
        subtitle: `${causeTitle ?? 'No cause on record'} · ${born}–${died}`,
      }
    },
  },
})
