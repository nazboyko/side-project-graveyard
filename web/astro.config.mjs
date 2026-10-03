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

export default defineConfig({
  output: 'static',
  site: env.SITE_URL || 'http://localhost:4321',
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
