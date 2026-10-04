import {getImage} from 'astro:assets'
import environmentWide from '../assets/scene/environment-wide.png'
import environmentMobile from '../assets/scene/environment-mobile.png'
import limestone from '../assets/scene/limestone-tile.png'
import ground from '../assets/scene/ground-tile.png'
import terrain from '../assets/scene/terrain-edge.png'

const sources = {environmentWide, environmentMobile, limestone, ground, terrain}
type SceneSource = keyof typeof sources
const images = new Map<string, ReturnType<typeof getImage>>()

/** Shared build derivatives: all graves reuse the same small material transfers. */
export function sceneImage(source: SceneSource, width: number, quality = 72) {
  const key = `${source}:${width}:${quality}`
  let image = images.get(key)
  if (!image) {
    image = getImage({src: sources[source], width, format: 'webp', quality})
    images.set(key, image)
  }
  return image
}
