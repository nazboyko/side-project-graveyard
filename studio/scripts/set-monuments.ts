/**
 * Sets the cause motifs and the monument fields from docs/DESIGN_BRIEF.md, section 4, in one transaction.
 * Safe to run again: every value is set, never appended.
 *
 *   npx sanity exec scripts/set-monuments.ts --with-user-token
 *
 * The five real graves get a relic taken from the public description of their repository and no inscription.
 */
import {getCliClient} from 'sanity/cli'

const MOTIFS: Record<string, string> = {
  'cause-lost-interest': 'overgrown',
  'cause-scope-creep': 'annexes',
  'cause-a-better-tool-shipped': 'signpost',
  'cause-got-a-real-job': 'briefcase',
  'cause-dependency-hell': 'vines',
  'cause-shipped-v1-never-looked-back': 'laurel',
  'cause-nobody-came': 'emptyPlot',
  'cause-rewrote-it-in-a-new-framework-and-never-finished': 'layers',
}

interface Monument {
  shape?: string
  relic?: string
  inscription?: string
  figures?: [value: string, label: string][]
}

const MONUMENTS: Record<string, Monument> = {
  'project-lantern-cms': {relic: 'key', inscription: '200 OK', shape: 'obelisk'},
  'project-fretwork': {relic: 'guitarPick', inscription: 'off by one'},
  'project-night-porter': {relic: 'serverLights', inscription: 'TODO: alerts'},
  'project-one-more-list': {inscription: '☐ finish ☐ finish ☐ finish'},
  'project-everything-js': {inscription: 'v0.0.9', shape: 'mausoleum'},
  'project-inkwell': {
    relic: 'crates',
    inscription: 'npm audit fix --force',
    figures: [
      ['3', 'posts'],
      ['1,412', 'dependencies'],
    ],
  },
  'project-sunday-letter': {
    relic: 'envelope',
    inscription: 'unsubscribe',
    figures: [
      ['1', 'subscriber'],
      ['100%', 'open rate'],
    ],
  },
  'project-marginalia': {inscription: 'v1 → v2 → v3'},
  'project-umbrella': {relic: 'umbrella', inscription: '--json'},
  'project-attic': {relic: 'notes', inscription: 'organise notes', figures: [['2', 'notes']]},
  'project-quiet-tabs': {relic: 'puzzlePiece', inscription: 'manifest v3', shape: 'broken'},
  'project-nine-tokens': {
    relic: 'coins',
    inscription: '2 of 9',
    figures: [
      ['9', 'tokens tracked'],
      ['7', 'outlived'],
    ],
  },
  'project-pocket-ledger': {inscription: 'wip'},
  'project-pdf-viewer-sdk': {relic: 'shovel'},
  'project-still-warm': {relic: 'cup'},
  'project-good-dog': {relic: 'collarTag'},
  'project-kindness-chain': {
    relic: 'chainLink',
    // Both numbers are from the repository's public README.
    figures: [
      ['21', 'links'],
      ['$2.10', 'pledged'],
    ],
  },
}

function toDocumentValue({shape, relic, inscription, figures}: Monument) {
  return {
    ...(shape && {shape}),
    ...(relic && {relic}),
    ...(inscription && {inscription}),
    ...(figures && {
      figures: figures.map(([value, label], index) => ({
        _key: `figure-${index + 1}`,
        _type: 'figure',
        value,
        label,
      })),
    }),
  }
}

async function main() {
  const client = getCliClient({apiVersion: '2026-09-01'})
  const ids = [...Object.keys(MOTIFS), ...Object.keys(MONUMENTS)]
  const found = await client.fetch<string[]>(`*[_id in $ids]._id`, {ids})
  const missing = ids.filter((id) => !found.includes(id))
  if (missing.length) throw new Error(`Not in the dataset: ${missing.join(', ')}`)

  const transaction = client.transaction()
  for (const [id, motif] of Object.entries(MOTIFS)) {
    transaction.patch(id, (patch) => patch.set({motif}))
  }
  for (const [id, monument] of Object.entries(MONUMENTS)) {
    transaction.patch(id, (patch) => patch.set({monument: toDocumentValue(monument)}))
  }
  const result = await transaction.commit()
  console.log(`${result.results.length} documents patched in transaction ${result.transactionId}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
