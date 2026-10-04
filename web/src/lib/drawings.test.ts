import {describe, expect, it} from 'vitest'
import {MOTIF_ART, MOTIFS_DRAWN_IN_PLACE, RELIC_ART} from './drawings'
import {MOTIFS, RELICS} from './monument'

describe('drawings', () => {
  it('has a drawing for every relic an editor can pick', () => {
    expect(Object.keys(RELIC_ART).sort()).toEqual([...RELICS].sort())
  })

  it('draws every motif somewhere, and only once', () => {
    const drawn = [...Object.keys(MOTIF_ART), ...MOTIFS_DRAWN_IN_PLACE]
    expect(drawn.sort()).toEqual([...MOTIFS].sort())
  })

  it('keeps every drawing to three fills at most, all from the colour tokens', () => {
    const TOKENS = ['soil', 'stone', 'parchment', 'brass', 'ground', 'board', 'candle', 'undead', 'near', 'grass', 'moss', 'ink']
    for (const [key, art] of [...Object.entries(RELIC_ART), ...Object.entries(MOTIF_ART)]) {
      const fills = new Set([...art!.matchAll(/class="f-([a-z]+)/g)].map(([, fill]) => fill).filter((f) => f !== 'none'))
      expect(fills.size, key).toBeLessThanOrEqual(3)
      for (const fill of fills) expect(TOKENS, `${key} uses ${fill}`).toContain(fill)
    }
  })

  it('draws with shapes only: no text, no scripts, no external references', () => {
    for (const art of [...Object.values(RELIC_ART), ...Object.values(MOTIF_ART)]) {
      expect(art).not.toMatch(/<(text|script|image|use|foreignObject)\b|href=|on[a-z]+=/i)
    }
  })
})
