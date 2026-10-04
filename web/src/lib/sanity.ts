import {sanityClient} from 'sanity:client'
import type {TypedObject} from 'astro-portabletext/types'
import {
  averageLifespan,
  longestLived,
  mostCommonCause,
  shortestLived,
  type CauseCount,
} from './stats'

/** Portable Text as it comes out of Sanity: an array of blocks. */
export type PortableText = TypedObject[]

export type Status = 'buried' | 'retired' | 'undead'
export type Mood = 'relief' | 'guilt' | 'denial' | 'peace'

export interface Settings {
  title: string
  tagline: string
  intro: PortableText | null
  keeperName: string | null
  footerLine: string | null
}

export interface CauseRef {
  title: string
  slug: string
  icon: string | null
}

export interface TechRef {
  name: string
  slug: string
  color: string
}

export interface Project {
  _id: string
  name: string
  slug: string
  epitaph: string
  status: Status
  bornAt: string
  diedAt: string | null
  cause: CauseRef
  stack: TechRef[]
  lastCommit: string | null
  moodAtDeath: Mood | null
  linesOfCode: number | null
  obituary: PortableText | null
  lesson: string
  repoUrl: string | null
}

export interface Cause extends CauseRef {
  description: string
  count: number
}

export interface Tech extends TechRef {
  count: number
}

export interface NamedLifespan {
  name: string
  slug: string
  days: number
}

export interface Stats {
  buried: number
  retired: number
  undead: number
  averageLifespanDays: number | null
  mostCommonCause: CauseCount | null
  shortest: NamedLifespan | null
  longest: NamedLifespan | null
}

const projectFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  epitaph,
  status,
  bornAt,
  diedAt,
  "cause": cause->{title, "slug": slug.current, icon},
  "stack": coalesce(stack[]->{name, "slug": slug.current, color}, []),
  lastCommit,
  moodAtDeath,
  linesOfCode,
  obituary,
  lesson,
  repoUrl
`

const cache = new Map<string, Promise<unknown>>()

/**
 * A static build renders 40-odd pages and every one of them needs the settings and the graves.
 * Each query runs once per build. In dev nothing is cached, so an edit in the Studio shows on reload.
 */
function once<T>(key: string, load: () => Promise<T>): Promise<T> {
  if (!import.meta.env.PROD) return load()
  if (!cache.has(key)) cache.set(key, load())
  return cache.get(key) as Promise<T>
}

export function getSettings(): Promise<Settings> {
  return once('settings', async () => {
    const settings = await sanityClient.fetch<Settings | null>(
      /* groq */ `*[_id == "siteSettings"][0]{title, tagline, intro, keeperName, footerLine}`,
    )
    if (!settings) throw new Error('siteSettings is missing from the dataset. Import studio/seed/graveyard.ndjson.')
    return settings
  })
}

/** Every grave, oldest death first, like a cemetery that grew outwards. The undead have no date and come last. */
export function getProjects(): Promise<Project[]> {
  return once('projects', () =>
    sanityClient.fetch<Project[]>(
      /* groq */ `*[_type == "project" && defined(slug.current)]
        | order(coalesce(diedAt, "9999-12-31") asc, name asc) {${projectFields}}`,
    ),
  )
}

export async function getProject(slug: string): Promise<Project | null> {
  return sanityClient.fetch<Project | null>(
    /* groq */ `*[_type == "project" && slug.current == $slug][0]{${projectFields}}`,
    {slug},
  )
}

export function getCauses(): Promise<Cause[]> {
  return once('causes', () =>
    sanityClient.fetch<Cause[]>(
      /* groq */ `*[_type == "cause" && defined(slug.current)] | order(title asc) {
        title,
        "slug": slug.current,
        icon,
        description,
        "count": count(*[_type == "project" && references(^._id)])
      }`,
    ),
  )
}

export function getTechs(): Promise<Tech[]> {
  return once('techs', () =>
    sanityClient.fetch<Tech[]>(
      /* groq */ `*[_type == "tech" && defined(slug.current)] | order(name asc) {
        name,
        "slug": slug.current,
        color,
        "count": count(*[_type == "project" && references(^._id)])
      }`,
    ),
  )
}

/** The numbers on the gate, computed from the graves themselves at build time. */
export function getStats(projects: Project[]): Stats {
  const count = (status: Status) => projects.filter((project) => project.status === status).length
  const named = (lifespan: ReturnType<typeof shortestLived<Project>>): NamedLifespan | null =>
    lifespan && {name: lifespan.project.name, slug: lifespan.project.slug, days: lifespan.days}

  return {
    buried: count('buried'),
    retired: count('retired'),
    undead: count('undead'),
    averageLifespanDays: averageLifespan(projects),
    mostCommonCause: mostCommonCause(projects),
    shortest: named(shortestLived(projects)),
    longest: named(longestLived(projects)),
  }
}
