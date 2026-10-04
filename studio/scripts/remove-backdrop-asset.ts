/**
 * Removes the image the backdrop test uploaded (scripts/set-backdrop.ts) once nothing points at it. Run from studio/.
 *
 *   npx sanity exec scripts/remove-backdrop-asset.ts --with-user-token            lists, deletes nothing
 *   npx sanity exec scripts/remove-backdrop-asset.ts --with-user-token -- delete  deletes the unreferenced ones
 *
 * Only assets uploaded under the test's file name are considered, and one that any document still references is
 * never deleted. Deleting an asset cannot be undone; the source file stays in web/src/assets/scene/.
 */
import {getCliClient} from 'sanity/cli'

const FILENAME = 'environment-wide.png'

interface Found {
  _id: string
  size: number
  references: number
}

async function main() {
  const remove = process.argv.at(-1) === 'delete'
  const client = getCliClient({apiVersion: '2026-09-01'})
  const found = await client.fetch<Found[]>(
    /* groq */ `*[_type == "sanity.imageAsset" && originalFilename == $name]{_id, size, "references": count(*[references(^._id)])}`,
    {name: FILENAME},
  )

  if (found.length === 0) {
    console.log(`No asset named ${FILENAME} in the dataset. Nothing to remove.`)
    return
  }

  for (const asset of found) {
    const kb = Math.round(asset.size / 1000)
    if (asset.references > 0) {
      console.log(`kept     ${asset._id} (${kb} KB): ${asset.references} document(s) still point at it`)
    } else if (remove) {
      await client.delete(asset._id)
      console.log(`deleted  ${asset._id} (${kb} KB)`)
    } else {
      console.log(`unused   ${asset._id} (${kb} KB): run again with "-- delete" to remove it`)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
