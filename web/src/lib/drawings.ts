/**
 * The small drawings a grave can carry: one object left at the grave (relic), and the mark a cause leaves on the
 * plot (motif). Each is the inside of a 48×48 SVG: flat fills from the colour tokens (by class), one ink outline.
 * Keys are the values an editor can pick in the Studio; a key with no drawing renders nothing.
 */
import type {Motif, Relic} from './monument'

export const RELIC_ART: Record<Relic, string> = {
  shovel:
    '<path class="f-soil" d="M33 3 L38 8 L22 29 L18 25 Z"/>' +
    '<path class="f-soil" d="M29 4 L36 1 L41 7 L38 11 Z"/>' +
    '<path class="f-stone" d="M17 24 L23 30 L20 40 Q15 47 8 44 Q3 39 8 33 Z"/>',
  envelope:
    '<path class="f-parchment" d="M5 14 H43 V37 H5 Z"/>' +
    '<path class="f-none" d="M5 14 L24 28 L43 14"/>' +
    '<circle class="f-brass" cx="24" cy="28" r="3.5"/>',
  umbrella:
    '<path class="f-stone" d="M4 24 Q4 8 24 6 Q44 8 44 24 Q40 21 34 24 Q29 21 24 24 Q19 21 14 24 Q8 21 4 24 Z"/>' +
    '<path class="f-none" d="M24 24 V40 Q24 45 19 45 Q15 45 15 41"/>',
  key:
    '<circle class="f-brass" cx="12" cy="24" r="8"/>' +
    '<circle class="f-ground" cx="12" cy="24" r="3"/>' +
    '<path class="f-brass" d="M20 21.5 H44 V26.5 H40 V32 H36 V26.5 H32 V30 H28 V26.5 H20 Z"/>',
  coins:
    '<ellipse class="f-brass" cx="17" cy="22" rx="6" ry="9"/>' +
    '<ellipse class="f-brass" cx="27" cy="23" rx="5.5" ry="8.5"/>' +
    '<ellipse class="f-brass" cx="9" cy="39" rx="6" ry="2.5"/>' +
    '<ellipse class="f-brass" cx="20" cy="41" rx="6" ry="2.5"/>' +
    '<ellipse class="f-brass" cx="31" cy="40" rx="6" ry="2.5"/>' +
    '<ellipse class="f-brass" cx="40" cy="42" rx="5.5" ry="2.3"/>' +
    '<ellipse class="f-brass" cx="15" cy="35" rx="5.5" ry="2.3"/>' +
    '<ellipse class="f-brass" cx="27" cy="34" rx="5.5" ry="2.3"/>' +
    '<ellipse class="f-brass" cx="38" cy="35.5" rx="5" ry="2.2"/>',
  crates:
    '<path class="f-brass" d="M5 33 H24 V47 H5 Z M24 33 H43 V47 H24 Z"/>' +
    '<path class="f-parchment" d="M9 19 H28 V33 H9 Z M28 21 H41 V33 H28 Z"/>' +
    '<path class="f-brass" d="M14 3 H31 V19 H14 Z"/>' +
    '<path class="f-none" d="M5 40 H43 M9 26 H41 M14 11 H31 M14.5 19 L30.5 3"/>',
  puzzlePiece:
    '<path class="f-stone" d="M10 14 H19 Q17 7 24 7 Q31 7 29 14 H38 V23 Q45 21 45 28 Q45 35 38 33 V42 H10 V33 Q17 35 17 28 Q17 21 10 23 Z"/>',
  guitarPick: '<path class="f-candle" d="M8 10 Q24 2 40 10 Q42 20 27 41 Q24 45 21 41 Q6 20 8 10 Z"/>',
  notes:
    '<path class="f-parchment" d="M12 6 H36 V30 L30 36 H12 Z" transform="rotate(-8 24 21)"/>' +
    '<path class="f-parchment" d="M14 12 H40 V38 L33 44 H14 Z"/>' +
    '<path class="f-none" d="M19 20 H34 M19 26 H34 M19 32 H28"/>',
  serverLights:
    '<path class="f-board" d="M6 12 H42 V38 H6 Z"/>' +
    '<circle class="f-undead" cx="13" cy="25" r="3"/>' +
    '<circle class="f-near" cx="21" cy="25" r="3"/>' +
    '<circle class="f-undead" cx="29" cy="25" r="3"/>' +
    '<circle class="f-near" cx="37" cy="25" r="3"/>',
  collarTag:
    '<circle class="f-none" cx="24" cy="9" r="5"/>' +
    '<path class="f-brass" d="M24 14 Q36 14 38 26 Q38 40 24 44 Q10 40 10 26 Q12 14 24 14 Z"/>' +
    '<circle class="f-ground" cx="24" cy="19" r="2"/>',
  cup:
    '<path class="f-parchment" d="M32 20 Q45 20 45 29 Q45 38 32 38 V33.5 Q40 33.5 40 29 Q40 24.5 32 24.5 Z"/>' +
    '<path class="f-parchment" d="M6 15 H34 V36 Q34 44 26 44 H14 Q6 44 6 36 Z"/>' +
    '<path class="f-soil" d="M6 15 H34 V20 H6 Z"/>',
  chainLink:
    '<rect class="f-stone" x="4" y="15" width="24" height="15" rx="7.5"/>' +
    '<rect class="f-ground" x="10" y="20" width="12" height="5" rx="2.5"/>' +
    '<rect class="f-stone" x="20" y="19" width="24" height="15" rx="7.5"/>' +
    '<rect class="f-ground" x="26" y="24" width="12" height="5" rx="2.5"/>' +
    '<path class="f-stone" d="M22 19 V23 Q23 18 28 17 V15 Q23 15 22 19 Z"/>',
}

/** Motifs that are drawn as an object beside the stone. The other three are drawn into the ground or the stone. */
export const MOTIF_ART: Partial<Record<Motif, string>> = {
  annexes:
    '<path class="f-stone" d="M18 14 Q18 8 30 8 Q42 8 42 14 V46 H18 Z"/>' +
    '<path class="f-brass" d="M2 24 H16 V34 H2 Z"/>' +
    '<circle class="f-ink" cx="5" cy="27" r="1"/>' +
    '<circle class="f-ink" cx="13" cy="31" r="1"/>',
  signpost:
    '<path class="f-soil" d="M20 19 H25 V47 H20 Z"/>' +
    '<path class="f-parchment" d="M3 7 H35 L45 15 L35 23 H3 Z"/>' +
    '<path class="f-none" d="M10 15 H33 M28 10.5 L33 15 L28 19.5"/>',
  briefcase:
    '<path class="f-none" d="M17 18 V13 Q17 10 20 10 H28 Q31 10 31 13 V18"/>' +
    '<path class="f-brass" d="M4 18 H44 V45 H4 Z"/>' +
    '<path class="f-none" d="M4 28 H44"/>' +
    '<path class="f-parchment" d="M20 24.5 H28 V31.5 H20 Z"/>',
  vines:
    '<path class="f-none s-grass" d="M14 48 C2 38 24 32 12 24 C2 17 22 11 12 1"/>' +
    '<path class="f-moss" d="M13 38 Q28 30 33 38 Q24 46 13 38 Z"/>' +
    '<path class="f-moss" d="M11 22 Q-3 17 -1 8 Q11 11 11 22 Z"/>' +
    '<path class="f-moss" d="M14 10 Q28 2 32 9 Q24 16 14 10 Z"/>',
  emptyPlot:
    '<path class="f-none s-grass" d="M16 48 C16 30 22 16 34 14 C42 13 44 21 39 26"/>' +
    '<path class="f-parchment" d="M39 25 Q47 26 47 34 Q39 38 35 31 Q33 26 39 25 Z"/>' +
    '<path class="f-moss" d="M17 38 Q6 35 4 26 Q14 28 17 38 Z"/>',
}

/** Motifs drawn into the ground or onto the stone itself, by Plants.astro and Stone.astro. */
export const MOTIFS_DRAWN_IN_PLACE: Motif[] = ['overgrown', 'laurel', 'layers']
