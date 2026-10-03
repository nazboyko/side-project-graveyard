import {describe, expect, it} from 'vitest'
import {chipColor} from './color'

describe('chipColor', () => {
  it('passes a six-digit hex colour through as a custom property', () => {
    expect(chipColor('#5fd4f4')).toBe('--chip:#5fd4f4')
    expect(chipColor('#E8E6E1')).toBe('--chip:#E8E6E1')
  })

  it('drops anything else', () => {
    expect(chipColor('red')).toBeUndefined()
    expect(chipColor('#fff')).toBeUndefined()
    expect(chipColor('#5fd4f4;background:url(x)')).toBeUndefined()
    expect(chipColor('')).toBeUndefined()
    expect(chipColor(null)).toBeUndefined()
    expect(chipColor(undefined)).toBeUndefined()
  })
})
