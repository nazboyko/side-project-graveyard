/**
 * Proves the publish → webhook → deploy hook → rebuild chain without opening the Studio.
 *
 *   npx sanity exec scripts/touch-settings.ts --with-user-token -- touch
 *   npx sanity exec scripts/touch-settings.ts --with-user-token -- restore
 *
 * `touch` appends a timestamp to siteSettings.footerLine and prints it, so the live site can be
 * polled for that exact text. `restore` removes it again.
 */
import {getCliClient} from 'sanity/cli'

const STAMP = / \[rebuilt [^\]]+\]$/

async function main() {
  const mode = process.argv.at(-1)
  if (mode !== 'touch' && mode !== 'restore') {
    throw new Error('Pass "touch" or "restore" after "--".')
  }

  const client = getCliClient({apiVersion: '2026-09-01'})
  const footerLine = await client.fetch<string | null>(`*[_id == "siteSettings"][0].footerLine`)
  if (!footerLine) throw new Error('siteSettings.footerLine is empty. Import the seed first.')

  const clean = footerLine.replace(STAMP, '')
  const stamp = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const next = mode === 'touch' ? `${clean} [rebuilt ${stamp}]` : clean

  await client.patch('siteSettings').set({footerLine: next}).commit()
  console.log(next)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
