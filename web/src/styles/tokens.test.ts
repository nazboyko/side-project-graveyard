import {readFileSync} from 'node:fs'
import {describe, expect, it} from 'vitest'

const css = readFileSync(new URL('./tokens.css', import.meta.url), 'utf8')
const tokens = Object.fromEntries([...css.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})\b/gi)].map(([, name, hex]) => [name, hex]))

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

function contrast(foreground: string, background: string): number {
  const [light, dark] = [luminance(tokens[foreground]), luminance(tokens[background])].sort((a, b) => b - a)
  return (light + 0.05) / (dark + 0.05)
}

// Every pair of text and background the site uses, with the ratio the design brief promises.
const PAIRS: [foreground: string, background: string, promised: number][] = [
  ['ink', 'stone-hi', 8.1],
  ['ink', 'stone', 6.5],
  ['ink', 'stone-aged', 5.7],
  ['ink', 'stone-ancient', 5.2],
  ['ink-soft', 'stone-hi', 7.3],
  ['ink-soft', 'stone', 5.9],
  ['ink-soft', 'stone-aged', 5.2],
  ['ink-soft', 'stone-ancient', 4.7],
  ['text', 'ground', 13.6],
  ['muted', 'ground', 8.3],
  ['text', 'sky-top', 12.3],
  ['candle', 'ground', 8.9],
  ['ink', 'brass', 5.8],
  ['ink', 'parchment', 10.3],
  ['text', 'board', 12.1],
  ['muted', 'board', 7.3],
  ['candle', 'board', 7.9],
  ['undead', 'ground', 8.2],
]

describe('colour tokens', () => {
  it('defines every token the pairs use', () => {
    for (const [foreground, background] of PAIRS) {
      expect(tokens[foreground], foreground).toMatch(/^#/)
      expect(tokens[background], background).toMatch(/^#/)
    }
  })

  it.each(PAIRS)('%s on %s keeps its promised contrast', (foreground, background, promised) => {
    const ratio = contrast(foreground, background)
    expect(ratio).toBeGreaterThanOrEqual(4.5)
    expect(ratio).toBeCloseTo(promised, 0)
  })
})
