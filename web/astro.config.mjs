// @ts-check
/// <reference types="node" />
import {defineConfig} from 'astro/config'
import sanity from '@sanity/astro'
import {loadEnv} from 'vite'

// .env files are not on import.meta.env inside this file, so read them the way Vite does.
// An empty prefix also picks up real environment variables, which is how CI and the host pass them.
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '')

const projectId = env.PUBLIC_SANITY_PROJECT_ID
const dataset = env.PUBLIC_SANITY_DATASET
if (!projectId || !dataset) {
  throw new Error('Set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET in web/.env or the environment.')
}

/**
 * SITE_URL is typed by hand into a dashboard and a .env file, sometimes without the scheme.
 * @param {string | undefined} url
 */
function withScheme(url) {
  if (!url) return undefined
  return /^https?:\/\//.test(url) ? url : `https://${url}`
}

export default defineConfig({
  output: 'static',
  // Canonical and Open Graph URLs always point at production, also from a local build.
  site: withScheme(env.SITE_URL) || 'https://side-project-graveyard.boyko-nazar.workers.dev',
  integrations: [
    sanity({
      projectId,
      dataset,
      // Content is fetched once, at build time. The CDN could hand a rebuild stale content.
      useCdn: false,
      apiVersion: '2026-09-01',
    }),
  ],
})
