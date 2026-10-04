/**
 * The stone is computed from the record. Everything about how a grave looks comes from its dates, its status,
 * its cause and its optional monument fields; nothing here knows any grave by name.
 * Pure: the clock is passed in, so a test can pin it.
 */
import {lifespanDays} from './stats'

export const STONE_SHAPES = ['arch', 'shoulder', 'gothic', 'tablet', 'obelisk', 'broken'] as const
export const LAYOUT_SHAPES = ['marker', 'plaque', 'mausoleum'] as const
export const MOTIFS = [
  'overgrown',
  'annexes',
  'signpost',
  'briefcase',
  'vines',
  'laurel',
  'emptyPlot',
  'layers',
] as const
export const RELICS = [
  'shovel',
  'envelope',
  'umbrella',
  'key',
  'coins',
  'crates',
  'puzzlePiece',
  'guitarPick',
  'notes',
  'serverLights',
  'collarTag',
  'cup',
  'chainLink',
] as const

export type StoneShape = (typeof STONE_SHAPES)[number]
export type Shape = StoneShape | (typeof LAYOUT_SHAPES)[number]
export type Layout = 'stone' | (typeof LAYOUT_SHAPES)[number]
export type Motif = (typeof MOTIFS)[number]
export type Relic = (typeof RELICS)[number]
export type Weathering = 'fresh' | 'settled' | 'aged' | 'ancient' | 'disturbed'

export interface MonumentInput {
  slug: string
  status: string
  bornAt: string
  diedAt?: string | null
  cause?: {motif?: string | null} | null
  monument?: {shape?: string | null; relic?: string | null; inscription?: string | null} | null
}

export interface Monument {
  layout: Layout
  shape: Shape
  /** 0 for a project that lived a day or less, 1 for four years or more, on a log scale. */
  life: number
  weathering: Weathering
  motif: Motif | null
  relic: Relic | null
  inscription: string | null
  /** Degrees. */
  tilt: number
  /** rem, sideways offset inside the plot. */
  dx: number
  /** rem, how far the stone sits back from the front of the plot. */
  dy: number
}

const DAY_MS = 86_400_000
const LONGEST_DAYS = 1500
const UNDEAD_LIFE = 0.55
const MARKER_DAYS = 7
const ORDINARY_SHAPES: StoneShape[] = ['arch', 'shoulder', 'gothic', 'tablet']

function oneOf<T extends string>(list: readonly T[], value: unknown): T | null {
  return typeof value === 'string' && (list as readonly string[]).includes(value) ? (value as T) : null
}

/** FNV-1a, 32 bit, scaled to 0..1. The salt gives each property its own independent value. */
function unitHash(slug: string, salt: string): number {
  let hash = 0x811c9dc5
  const text = `${salt}:${slug}`
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0) / 0xffffffff
}

const round2 = (value: number) => Math.round(value * 100) / 100

export function lifeScale(days: number | null): number {
  if (days === null) return UNDEAD_LIFE
  const scaled = Math.log10(Math.max(days, 0) + 1) / Math.log10(LONGEST_DAYS + 1)
  return round2(Math.min(1, Math.max(0, scaled)))
}

export function weatheringFor(diedAt: string | null | undefined, now: Date): Weathering {
  if (!diedAt) return 'disturbed'
  const died = Date.parse(`${diedAt}T00:00:00Z`)
  if (Number.isNaN(died)) return 'fresh'
  const years = (now.getTime() - died) / DAY_MS / 365.25
  if (years < 1) return 'fresh'
  if (years < 4) return 'settled'
  if (years < 8) return 'aged'
  return 'ancient'
}

export function describeMonument(project: MonumentInput, now: Date): Monument {
  const undead = project.status === 'undead'
  const days = undead ? null : lifespanDays(project.bornAt, project.diedAt)
  const motif = oneOf(MOTIFS, project.cause?.motif)
  const chosen = oneOf([...STONE_SHAPES, ...LAYOUT_SHAPES], project.monument?.shape)

  let layout: Layout
  let shape: Shape
  if (chosen) {
    layout = oneOf(LAYOUT_SHAPES, chosen) ?? 'stone'
    shape = chosen
  } else if (project.status === 'retired') {
    layout = shape = 'plaque'
  } else if (project.status === 'buried' && days !== null && days < MARKER_DAYS) {
    layout = shape = 'marker'
  } else {
    layout = 'stone'
    shape = ORDINARY_SHAPES[Math.floor(unitHash(project.slug, 'shape') * ORDINARY_SHAPES.length) % 4]
  }

  // An overgrown stone has been leaning for a while: at least 1.4 degrees, whichever way the hash says.
  const tiltUnit = unitHash(project.slug, 'tilt') * 2 - 1
  const tilt = motif === 'overgrown' ? Math.sign(tiltUnit || 1) * (1.4 + Math.abs(tiltUnit)) : tiltUnit * 0.6
  const inscription = project.monument?.inscription?.trim() || null

  return {
    layout,
    shape,
    life: lifeScale(days),
    weathering: undead ? 'disturbed' : weatheringFor(project.diedAt, now),
    motif,
    relic: oneOf(RELICS, project.monument?.relic),
    inscription,
    tilt: round2(tilt),
    dx: round2((unitHash(project.slug, 'dx') * 2 - 1) * 0.75),
    dy: round2(unitHash(project.slug, 'dy') * 0.75),
  }
}

/**
 * The grave the cat sits on: the one the keeper published most recently, so it moves on every publish.
 * Ties go to the name that sorts first. No graves, no cat.
 */
export function catGrave<T extends {slug: string; name: string; _updatedAt?: string | null}>(projects: T[]): string | null {
  const ranked = [...projects].sort(
    (a, b) => (b._updatedAt ?? '').localeCompare(a._updatedAt ?? '') || a.name.localeCompare(b.name),
  )
  return ranked[0]?.slug ?? null
}
