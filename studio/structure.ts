import type {StructureResolver} from 'sanity/structure'

// siteSettings is a singleton: one fixed document, opened straight from the desk.
export const SINGLETON_TYPES = new Set(['siteSettings'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Graveyard office')
    .items([
      S.listItem()
        .title('Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Settings')),
      S.divider(),
      S.listItem()
        .title('Graveyard')
        .id('project')
        .schemaType('project')
        .child(
          S.documentTypeList('project')
            .title('Graveyard')
            .defaultOrdering([{field: 'diedAt', direction: 'desc'}]),
        ),
      S.documentTypeListItem('cause').title('Causes of death'),
      S.documentTypeListItem('tech').title('Stack'),
    ])
