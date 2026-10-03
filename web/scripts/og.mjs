// Draws public/og.png, the 1200×630 social card. Run by hand when the title changes: `node scripts/og.mjs`.
// The PNG is committed, so the build never needs this script or its fonts.
import {fileURLToPath} from 'node:url'
import sharp from 'sharp'

const TITLE = ['Side Project', 'Graveyard']
const TAGLINE = 'Every repo deserves a proper burial.'

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="sky" cx="50%" cy="0%" r="95%">
      <stop offset="0" stop-color="#1f2637"/>
      <stop offset="1" stop-color="#0d0f13"/>
    </radialGradient>
    <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#323845"/>
      <stop offset="1" stop-color="#23272f"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#f5c451" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#f5c451" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#sky)"/>
  <path d="M250 630V300a350 240 0 0 1 700 0v330z" fill="url(#stone)" stroke="#3d4350" stroke-width="2"/>
  <g font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">
    <text x="600" y="270" font-size="84" font-weight="700" fill="#e9e6df">${TITLE[0]}</text>
    <text x="600" y="365" font-size="84" font-weight="700" fill="#e9e6df">${TITLE[1]}</text>
    <text x="600" y="445" font-size="34" font-style="italic" fill="#f5c451">${TAGLINE}</text>
  </g>
  <circle cx="600" cy="540" r="90" fill="url(#glow)"/>
  <rect x="592" y="548" width="16" height="46" rx="3" fill="#e6dcc0"/>
  <rect x="599" y="540" width="2" height="9" fill="#4a4234"/>
  <path d="M600 508c9 12 12 20 12 26a12 12 0 0 1-24 0c0-6 3-14 12-26z" fill="#f5c451"/>
  <path d="M600 522c4 6 6 10 6 13a6 6 0 0 1-12 0c0-3 2-7 6-13z" fill="#fff7dc"/>
</svg>`

const out = fileURLToPath(new URL('../public/og.png', import.meta.url))
await sharp(Buffer.from(svg)).png({compressionLevel: 9}).toFile(out)
console.log(`wrote ${out}`)
