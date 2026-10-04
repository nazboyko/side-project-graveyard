// Draws public/og.png, the 1200×630 social card, from the same scene as the home page's gate: dusk sky, hills
// with the chapel, trees, the fence with its open gate, and a few stones on the ground in front.
// Run by hand when the title or the scene changes: `node scripts/og.mjs`. The PNG is committed, so the build
// never needs this script. The title is set in Georgia: the card is drawn by sharp, which cannot load Fraunces.
import {fileURLToPath} from 'node:url'
import sharp from 'sharp'

const TITLE = 'Side Project Graveyard'
const TAGLINE = 'Every repo deserves a proper burial.'
const COUNT = 'Every stone is computed from its record.'

const C = {
  skyTop: '#1d2636',
  skyMid: '#435061',
  skyLow: '#c98f5a',
  far: '#2c3644',
  near: '#161c19',
  ground: '#191f1a',
  grass: '#56653f',
  stoneHi: '#bdb9aa',
  stone: '#aaa697',
  stoneAged: '#9d9c8c',
  ink: '#22231e',
  text: '#ece7da',
  candle: '#f0b24f',
  candleHot: '#ffe1a0',
}

// The skyline, in the 1600×500 units of the gate on the home page.
const pickets = []
for (let x = 6; x < 1600; x += 22) {
  if (x > 700 && x < 900) continue
  pickets.push(`M${x} 488 V418 L${x + 3} 410 L${x + 6} 418 V488 Z`)
}
const gateBars = Array.from({length: 8}, (_, i) => 714 + i * 10.5)
const bar = (x) => `<rect x="${x}" y="${402 - Math.min(x - 712, 790 - x) * 0.32}" width="3.5" height="88"/>`

const skyline = `
  <path fill="${C.far}" d="M0 330 C140 300 240 286 380 300 C520 314 600 276 720 262 C820 252 900 270 1010 286 C1140 304 1250 276 1380 268 C1480 262 1550 280 1600 290 V500 H0 Z"/>
  <g fill="${C.far}">
    <path d="M1196 286 V236 L1222 214 L1248 236 V286 Z"/><path d="M1218 214 V186 H1226 V214 Z"/>
    <path d="M1214 194 H1230 V200 H1214 Z"/><path d="M1248 286 V250 H1290 V286 Z"/><path d="M1246 252 L1269 236 L1292 252 Z"/>
  </g>
  <g fill="${C.near}" opacity="0.7">
    <path d="M0 372 C30 340 52 336 70 352 C82 316 112 306 132 330 C150 300 186 298 200 334 C226 318 256 326 266 350 C300 344 330 350 352 366 L360 380 H0 Z"/>
    <path d="M1240 368 C1262 330 1292 318 1314 342 C1330 300 1366 292 1384 326 C1404 296 1446 300 1458 338 C1484 322 1520 328 1534 352 C1560 344 1588 350 1600 360 V384 H1240 Z"/>
    <path d="M430 372 L452 296 L474 372 Z M462 374 L488 278 L514 374 Z"/><path d="M1080 374 L1102 304 L1124 374 Z M1112 376 L1134 318 L1156 376 Z"/>
  </g>
  <g fill="${C.near}">
    <rect x="0" y="420" width="1600" height="6"/><rect x="0" y="472" width="1600" height="6"/>
    <path d="${pickets.join(' ')}"/>
    <rect x="694" y="352" width="18" height="140"/><rect x="888" y="352" width="18" height="140"/>
    <path d="M690 352 H716 L703 336 Z M884 352 H910 L897 336 Z"/>
    <path d="M712 404 C760 372 790 366 800 364 C810 366 840 372 888 404 V410 C840 380 810 374 800 372 C790 374 760 380 712 410 Z"/>
    ${gateBars.map(bar).join('')}${gateBars.map((x) => bar(1600 - x - 3.5)).join('')}
  </g>`

// A few stones in front of the fence: an arch, a tablet, a low marker, a gothic stone, all blank.
const stone = (x, w, h, top, fill) => {
  const y = 612 - h
  const tops = {
    arch: `M${x} ${612} V${y + w * 0.46} A${w / 2} ${w * 0.46} 0 0 1 ${x + w} ${y + w * 0.46} V612 Z`,
    tablet: `M${x} 612 V${y + 4} Q${x} ${y} ${x + 4} ${y} H${x + w - 4} Q${x + w} ${y} ${x + w} ${y + 4} V612 Z`,
    gothic: `M${x} 612 V${y + w * 0.4} C${x} ${y + w * 0.14} ${x + w * 0.22} ${y + w * 0.05} ${x + w / 2} ${y} C${x + w * 0.78} ${y + w * 0.05} ${x + w} ${y + w * 0.14} ${x + w} ${y + w * 0.4} V612 Z`,
  }
  return `<path d="${tops[top]}" fill="${fill}" stroke="${C.ink}" stroke-opacity="0.35"/>`
}

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.skyTop}"/>
      <stop offset="0.4" stop-color="${C.skyTop}"/>
      <stop offset="0.58" stop-color="${C.skyMid}"/>
      <stop offset="0.7" stop-color="${C.skyLow}"/>
      <stop offset="1" stop-color="${C.skyLow}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.candle}" stop-opacity="0.45"/>
      <stop offset="1" stop-color="${C.candle}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="540" fill="url(#sky)"/>
  <g transform="translate(0 165) scale(0.75)">${skyline}</g>
  <rect y="529" width="1200" height="101" fill="${C.ground}"/>
  <ellipse cx="600" cy="612" rx="560" ry="10" fill="${C.grass}" opacity="0.35"/>
  ${stone(92, 92, 118, 'arch', C.stoneAged)}
  ${stone(232, 104, 92, 'tablet', C.stone)}
  ${stone(392, 70, 52, 'arch', C.stoneHi)}
  ${stone(744, 84, 128, 'gothic', C.stone)}
  ${stone(880, 112, 98, 'tablet', C.stoneHi)}
  ${stone(1034, 86, 112, 'arch', C.stoneAged)}
  <circle cx="436" cy="586" r="34" fill="url(#glow)"/>
  <rect x="431" y="590" width="10" height="22" rx="2" fill="#e6dcc0"/>
  <path d="M436 570 c6 8 8 12 8 15 a8 8 0 0 1 -16 0 c0 -3 2 -7 8 -15 Z" fill="${C.candle}"/>
  <path d="M436 578 c3 4 4 6 4 8 a4 4 0 0 1 -8 0 c0 -2 1 -4 4 -8 Z" fill="${C.candleHot}"/>
  <g font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">
    <text x="600" y="118" font-size="80" font-weight="700" fill="${C.text}">${TITLE}</text>
    <text x="600" y="172" font-size="34" font-style="italic" fill="${C.candle}">${TAGLINE}</text>
    <text x="600" y="212" font-size="22" fill="${C.text}" font-family="Helvetica, Arial, sans-serif">${COUNT}</text>
  </g>
</svg>`

const out = fileURLToPath(new URL('../public/og.png', import.meta.url))
await sharp(Buffer.from(svg)).png({compressionLevel: 9}).toFile(out)
console.log(`wrote ${out}`)
