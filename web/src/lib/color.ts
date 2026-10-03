const HEX_COLOR = /^#[0-9a-fA-F]{6}$/

/**
 * Inline style for a tech chip. The colour comes from the CMS, so anything that is not
 * a plain six-digit hex colour is dropped instead of being written into a style attribute.
 */
export function chipColor(color: string | null | undefined): string | undefined {
  return color && HEX_COLOR.test(color) ? `--chip:${color}` : undefined
}
