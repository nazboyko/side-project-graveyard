import {readFileSync} from 'node:fs'
import {describe, expect, it} from 'vitest'
import {catGrave, describeMonument, grainOffset, lifeScale, weatheringFor, type MonumentInput} from './monument'

const NOW = new Date('2026-10-03T12:00:00Z')

const grave = (overrides: Partial<MonumentInput> = {}): MonumentInput => ({
  slug: 'a-grave',
  status: 'buried',
  bornAt: '2020-01-01',
  diedAt: '2021-06-01',
  ...overrides,
})

describe('lifeScale', () => {
  it('puts a project that lived no days at the bottom and four years at the top', () => {
    expect(lifeScale(0)).toBe(0)
    expect(lifeScale(1500)).toBe(1)
    expect(lifeScale(4000)).toBe(1)
  })

  it('grows on a log scale, so a week and a year are far apart', () => {
    expect(lifeScale(6)).toBeCloseTo(0.27, 2)
    expect(lifeScale(365)).toBeCloseTo(0.81, 2)
  })

  it('gives the undead a middling height', () => {
    expect(lifeScale(null)).toBe(0.55)
  })
})

describe('weatheringFor', () => {
  it('weathers by years since death', () => {
    expect(weatheringFor('2026-04-07', NOW)).toBe('fresh')
    expect(weatheringFor('2024-06-03', NOW)).toBe('settled')
    expect(weatheringFor('2021-12-19', NOW)).toBe('aged')
    expect(weatheringFor('2015-02-02', NOW)).toBe('ancient')
  })

  it('disturbs the ground of the undead', () => {
    expect(weatheringFor(null, NOW)).toBe('disturbed')
  })
})

describe('describeMonument', () => {
  it('builds a complete stone from the required fields alone', () => {
    const monument = describeMonument(grave(), NOW)
    expect(monument).toMatchObject({layout: 'stone', motif: null, relic: null, inscription: null})
    expect(['arch', 'shoulder', 'gothic', 'tablet']).toContain(monument.shape)
    expect(monument.life).toBeGreaterThan(0)
    expect(Math.abs(monument.tilt)).toBeLessThanOrEqual(0.6)
  })

  it('lets an explicit shape win, including the layouts', () => {
    expect(describeMonument(grave({monument: {shape: 'obelisk'}}), NOW)).toMatchObject({
      layout: 'stone',
      shape: 'obelisk',
    })
    expect(describeMonument(grave({monument: {shape: 'mausoleum'}}), NOW)).toMatchObject({
      layout: 'mausoleum',
      shape: 'mausoleum',
    })
  })

  it('gives the retired a plaque, even after a short life', () => {
    const retired = grave({status: 'retired', bornAt: '2026-08-14', diedAt: '2026-08-16'})
    expect(describeMonument(retired, NOW).layout).toBe('plaque')
  })

  it('gives a buried project that lived under a week a marker', () => {
    expect(describeMonument(grave({bornAt: '2026-04-07', diedAt: '2026-04-07'}), NOW).layout).toBe('marker')
    expect(describeMonument(grave({bornAt: '2020-04-11', diedAt: '2020-04-20'}), NOW).layout).toBe('stone')
  })

  it('treats the undead as disturbed and middling, whatever dates they carry', () => {
    const monument = describeMonument(grave({status: 'undead', diedAt: null}), NOW)
    expect(monument).toMatchObject({layout: 'stone', weathering: 'disturbed', life: 0.55})
  })

  it('ignores values it does not know instead of failing', () => {
    const monument = describeMonument(
      grave({
        cause: {motif: 'fireworks'},
        monument: {shape: 'pyramid', relic: 'skull', inscription: '   '},
      }),
      NOW,
    )
    expect(monument).toMatchObject({layout: 'stone', motif: null, relic: null, inscription: null})
  })

  it('passes known motifs, relics and inscriptions through', () => {
    const monument = describeMonument(
      grave({cause: {motif: 'vines'}, monument: {relic: 'crates', inscription: ' npm audit fix --force '}}),
      NOW,
    )
    expect(monument).toMatchObject({motif: 'vines', relic: 'crates', inscription: 'npm audit fix --force'})
  })

  it('leans every overgrown stone further than any other stone', () => {
    const slugs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const leans = (motif: string) =>
      slugs.map((slug) => Math.abs(describeMonument(grave({slug, cause: {motif}}), NOW).tilt))
    expect(Math.min(...leans('overgrown'))).toBeGreaterThanOrEqual(1.4)
    expect(Math.max(...leans('overgrown'))).toBeLessThanOrEqual(2.4)
    expect(Math.max(...leans('laurel'))).toBeLessThanOrEqual(0.6)
  })

  it('is deterministic', () => {
    expect(describeMonument(grave(), NOW)).toEqual(describeMonument(grave(), NOW))
  })
})

describe('describeMonument on the seed dataset', () => {
  const seed = readFileSync(new URL('../../../studio/seed/graveyard.ndjson', import.meta.url), 'utf8')
    .trim()
    .split('\n')
    .map((line) => JSON.parse(line))
  const motifs = new Map(seed.filter((doc) => doc._type === 'cause').map((doc) => [doc._id, doc.motif]))
  const graves = seed
    .filter((doc) => doc._type === 'project')
    .map((doc) => ({
      slug: doc.slug.current,
      status: doc.status,
      bornAt: doc.bornAt,
      diedAt: doc.diedAt ?? null,
      cause: {motif: motifs.get(doc.cause._ref)},
      monument: doc.monument ?? null,
    }))
    // The yard order: oldest death first, the undead last.
    .sort((a, b) => (a.diedAt ?? '9999').localeCompare(b.diedAt ?? '9999') || a.slug.localeCompare(b.slug))
  const monuments = graves.map((project) => describeMonument(project, NOW))
  const count = (pick: (m: (typeof monuments)[number]) => string) =>
    monuments.reduce<Record<string, number>>((tally, m) => ({...tally, [pick(m)]: (tally[pick(m)] ?? 0) + 1}), {})

  it('weathers the yard the way the brief expects', () => {
    expect(count((m) => m.weathering)).toEqual({ancient: 4, aged: 6, settled: 2, fresh: 5, disturbed: 1})
  })

  it('lays out the yard the way the brief expects', () => {
    expect(count((m) => m.layout)).toEqual({marker: 2, plaque: 3, mausoleum: 1, stone: 12})
    expect(monuments.filter((m) => m.shape === 'obelisk')).toHaveLength(1)
    expect(monuments.filter((m) => m.shape === 'broken')).toHaveLength(1)
  })

  it('never puts two stones of the same silhouette and height side by side', () => {
    for (let i = 1; i < monuments.length; i++) {
      const [a, b] = [monuments[i - 1], monuments[i]]
      expect(a.shape === b.shape && a.life === b.life, `${graves[i - 1].slug} and ${graves[i].slug}`).toBe(false)
    }
  })
})

describe('grainOffset', () => {
  it('is deterministic and stays inside the tile offsets', () => {
    expect(grainOffset('everything-js')).toEqual(grainOffset('everything-js'))
    for (const slug of ['a', 'pdf-viewer-sdk', 'a-slug-much-longer-than-any-grave-in-the-yard-today']) {
      const {x, y} = grainOffset(slug)
      expect(Number.isInteger(x) && x >= 0 && x < 113).toBe(true)
      expect(Number.isInteger(y) && y >= 0 && y < 127).toBe(true)
    }
  })

  it('keeps long slugs apart: a plain multiply-and-add hash gave every one of them the same crop', () => {
    const long = ['rewrote-it-in-a-new-framework-one', 'rewrote-it-in-a-new-framework-two', 'rewrote-it-in-a-new-framework-three']
    const crops = new Set(long.map((slug) => JSON.stringify(grainOffset(slug))))
    expect(crops.size).toBe(long.length)
  })
})

describe('catGrave', () => {
  const at = (slug: string, name: string, _updatedAt: string) => ({slug, name, _updatedAt})

  it('picks the grave published last', () => {
    expect(
      catGrave([
        at('attic', 'Attic', '2026-10-03T18:00:00Z'),
        at('umbrella', 'Umbrella', '2026-10-04T09:30:00Z'),
        at('inkwell', 'Inkwell', '2026-10-01T12:00:00Z'),
      ]),
    ).toBe('umbrella')
  })

  it('breaks a tie by name, whatever the order it was given', () => {
    const tie = [at('umbrella', 'Umbrella', '2026-10-03T18:00:00Z'), at('attic', 'Attic', '2026-10-03T18:00:00Z')]
    expect(catGrave(tie)).toBe('attic')
    expect(catGrave([...tie].reverse())).toBe('attic')
  })

  it('has no cat for an empty graveyard', () => {
    expect(catGrave([])).toBeNull()
  })
})
