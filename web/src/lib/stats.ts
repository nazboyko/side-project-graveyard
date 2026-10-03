/** Pure date and stats maths for the graveyard. No Sanity, no Astro, no clock. */

export interface Lived {
  name: string
  slug: string
  bornAt: string
  /** Missing for the undead: they have no date of death yet. */
  diedAt?: string | null
  cause?: {title: string; slug: string} | null
}

export interface CauseCount {
  title: string
  slug: string
  count: number
}

export interface Lifespan<T extends Lived = Lived> {
  project: T
  days: number
}

const DAY_MS = 86_400_000

/** Parses an ISO date (YYYY-MM-DD) as UTC midnight, so no timezone can move it. */
function utcDay(iso: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) throw new Error(`Not an ISO date: ${iso}`)
  const [, year, month, day] = match
  return Date.UTC(Number(year), Number(month) - 1, Number(day))
}

/** Whole days between birth and death. `null` for the undead. */
export function lifespanDays(bornAt: string, diedAt?: string | null): number | null {
  if (!diedAt) return null
  return Math.round((utcDay(diedAt) - utcDay(bornAt)) / DAY_MS)
}

/** Every project that has a date of death, with its lifespan. */
function lifespans<T extends Lived>(projects: T[]): Lifespan<T>[] {
  return projects.flatMap((project) => {
    const days = lifespanDays(project.bornAt, project.diedAt)
    return days === null ? [] : [{project, days}]
  })
}

/** Mean lifespan in whole days over the projects that have died. `null` when none have. */
export function averageLifespan(projects: Lived[]): number | null {
  const lived = lifespans(projects)
  if (lived.length === 0) return null
  return Math.round(lived.reduce((sum, {days}) => sum + days, 0) / lived.length)
}

/** The cause with the most graves. Ties go to the title that sorts first. */
export function mostCommonCause(projects: Lived[]): CauseCount | null {
  const counts = new Map<string, CauseCount>()
  for (const {cause} of projects) {
    if (!cause) continue
    const entry = counts.get(cause.slug) ?? {title: cause.title, slug: cause.slug, count: 0}
    entry.count += 1
    counts.set(cause.slug, entry)
  }
  const ranked = [...counts.values()].sort(
    (a, b) => b.count - a.count || a.title.localeCompare(b.title),
  )
  return ranked[0] ?? null
}

/** Ties go to the name that sorts first, so the answer never depends on query order. */
function extreme<T extends Lived>(projects: T[], direction: 1 | -1): Lifespan<T> | null {
  const ranked = lifespans(projects).sort(
    (a, b) => direction * (a.days - b.days) || a.project.name.localeCompare(b.project.name),
  )
  return ranked[0] ?? null
}

export function shortestLived<T extends Lived>(projects: T[]): Lifespan<T> | null {
  return extreme(projects, 1)
}

export function longestLived<T extends Lived>(projects: T[]): Lifespan<T> | null {
  return extreme(projects, -1)
}

/** "lived 23 days", "lived 1 day", "lived less than a day". */
export function formatLifespan(days: number): string {
  if (days < 1) return 'less than a day'
  return days === 1 ? '1 day' : `${days.toLocaleString('en-US')} days`
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/** "14 March 2011", the way it would be carved. */
export function formatDate(iso: string): string {
  const date = new Date(utcDay(iso))
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

/** The years on a stone: "2011–2015", "2016" for a life inside one year, "2022–" for the undead. */
export function formatYears(bornAt: string, diedAt?: string | null): string {
  const born = new Date(utcDay(bornAt)).getUTCFullYear()
  if (!diedAt) return `${born}–`
  const died = new Date(utcDay(diedAt)).getUTCFullYear()
  return born === died ? `${born}` : `${born}–${died}`
}

const MAX_TILT_DEG = 0.6

/** A stable lean for each stone, between -0.6 and 0.6 degrees, from a hash of its slug. */
export function slugTilt(slug: string): number {
  // FNV-1a, 32 bit
  let hash = 0x811c9dc5
  for (let i = 0; i < slug.length; i++) {
    hash ^= slug.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  const unit = (hash >>> 0) / 0xffffffff
  return Math.round((unit * 2 - 1) * MAX_TILT_DEG * 100) / 100
}
