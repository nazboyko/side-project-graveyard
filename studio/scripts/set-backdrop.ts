/**
 * Tests the optional scene backdrop (siteSettings.backdrop) without opening the Studio. Run from studio/.
 *
 *   npx sanity exec scripts/set-backdrop.ts --with-user-token -- set
 *   npx sanity exec scripts/set-backdrop.ts --with-user-token -- unset
 *
 * `set` uploads web/src/assets/scene/environment-wide.png as an image asset and points the field at it, with the
 * hotspot on the gate. `unset` empties the field again; the uploaded asset stays in the dataset, unused.
 * The site reads the field at build time. Empty means the two local images, which is the default.
 */
import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const SOURCE = resolve(process.cwd(), '../web/src/assets/scene/environment-wide.png')
// The gate stands left of centre in the wide image; a portrait crop should keep it.
const HOTSPOT = {_type: 'sanity.imageHotspot', x: 0.34, y: 0.5, width: 0.4, height: 0.5}
const CROP = {_type: 'sanity.imageCrop', top: 0, bottom: 0, left: 0, right: 0}

async function main() {
  const mode = process.argv.at(-1)
  if (mode !== 'set' && mode !== 'unset') {
    throw new Error('Pass "set" or "unset" after "--".')
  }

  const client = getCliClient({apiVersion: '2026-09-01'})

  if (mode === 'unset') {
    await client.patch('siteSettings').unset(['backdrop']).commit()
    console.log('siteSettings.backdrop is empty. The site uses its two local images.')
    return
  }

  const asset = await client.assets.upload('image', createReadStream(SOURCE), {filename: 'environment-wide.png'})
  await client
    .patch('siteSettings')
    .set({backdrop: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}, hotspot: HOTSPOT, crop: CROP}})
    .commit()
  console.log(`siteSettings.backdrop -> ${asset._id}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
