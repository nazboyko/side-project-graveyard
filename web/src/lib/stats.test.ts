import {describe, expect, it} from 'vitest'
import {
  averageLifespan,
  formatDate,
  formatLifespan,
  formatYears,
  lifespanDays,
  longestLived,
  mostCommonCause,
  shortestLived,
  type Lived,
} from './stats'

const lost = {title: 'Lost interest', slug: 'lost-interest'}
const scope = {title: 'Scope creep', slug: 'scope-creep'}
const nobody = {title: 'Nobody came', slug: 'nobody-came'}

const grave = (name: string, bornAt: string, diedAt: string | null, cause = lost): Lived => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  bornAt,
  diedAt,
  cause,
})

const graves: Lived[] = [
  grave('Umbrella', '2020-04-11', '2020-04-20'),
  grave('One More List', '2016-01-02', '2016-01-04'),
  grave('Everything', '2017-09-10', '2019-06-21', scope),
  grave('Pocket Ledger', '2022-03-01', null, scope),
]

describe('lifespanDays', () => {
  it('counts whole days between birth and death', () => {
    expect(lifespanDays('2016-01-02', '2016-01-04')).toBe(2)
  })

  it('is zero when a project dies the day it is born', () => {
    expect(lifespanDays('2026-04-07', '2026-04-07')).toBe(0)
  })

  it('counts the leap day', () => {
    expect(lifespanDays('2020-02-28', '2020-03-01')).toBe(2)
    expect(lifespanDays('2019-02-28', '2019-03-01')).toBe(1)
  })

  it('is not moved by daylight saving changes', () => {
    expect(lifespanDays('2021-03-13', '2021-03-15')).toBe(2)
    expect(lifespanDays('2021-11-06', '2021-11-08')).toBe(2)
  })

  it('spans years', () => {
    expect(lifespanDays('2011-03-14', '2015-02-02')).toBe(1421)
  })

  it('has no answer for the undead', () => {
    expect(lifespanDays('2022-03-01', null)).toBeNull()
    expect(lifespanDays('2022-03-01', undefined)).toBeNull()
  })

  it('refuses a date it cannot read', () => {
    expect(() => lifespanDays('March 2011', '2015-02-02')).toThrow('Not an ISO date')
  })
})

describe('averageLifespan', () => {
  it('averages only the projects that have died', () => {
    // 9, 2 and 649 days; the undead one is left out
    expect(averageLifespan(graves)).toBe(220)
  })

  it('rounds to whole days', () => {
    expect(averageLifespan([grave('A', '2020-01-01', '2020-01-02'), grave('B', '2020-01-01', '2020-01-03')])).toBe(2)
  })

  it('has no answer when nothing has died', () => {
    expect(averageLifespan([grave('Pocket Ledger', '2022-03-01', null)])).toBeNull()
    expect(averageLifespan([])).toBeNull()
  })
})

describe('mostCommonCause', () => {
  it('finds the cause with the most graves, counting the undead too', () => {
    const withOneMore = [...graves, grave('Attic', '2020-11-01', '2021-12-19', scope)]
    expect(mostCommonCause(withOneMore)).toEqual({...scope, count: 3})
  })

  it('breaks a tie by title', () => {
    expect(mostCommonCause(graves)).toEqual({...lost, count: 2})
    expect(mostCommonCause([grave('A', '2020-01-01', null, scope), grave('B', '2020-01-01', null, nobody)])).toEqual({
      ...nobody,
      count: 1,
    })
  })

  it('skips graves with no cause and has no answer for an empty graveyard', () => {
    expect(mostCommonCause([{name: 'X', slug: 'x', bornAt: '2020-01-01', cause: null}])).toBeNull()
    expect(mostCommonCause([])).toBeNull()
  })
})

describe('shortestLived and longestLived', () => {
  it('finds the shortest and the longest life', () => {
    expect(shortestLived(graves)).toMatchObject({project: {name: 'One More List'}, days: 2})
    expect(longestLived(graves)).toMatchObject({project: {name: 'Everything'}, days: 649})
  })

  it('never picks the undead', () => {
    const young = [grave('Pocket Ledger', '2022-03-01', null), grave('Umbrella', '2020-04-11', '2020-04-20')]
    expect(shortestLived(young)?.project.name).toBe('Umbrella')
    expect(longestLived(young)?.project.name).toBe('Umbrella')
  })

  it('breaks a tie by name, whatever the input order', () => {
    const tie = [grave('Zeta', '2020-01-01', '2020-01-03'), grave('Alpha', '2021-05-01', '2021-05-03')]
    expect(shortestLived(tie)?.project.name).toBe('Alpha')
    expect(shortestLived([...tie].reverse())?.project.name).toBe('Alpha')
    expect(longestLived(tie)?.project.name).toBe('Alpha')
  })

  it('has no answer when nothing has died', () => {
    expect(shortestLived([grave('Pocket Ledger', '2022-03-01', null)])).toBeNull()
    expect(longestLived([])).toBeNull()
  })
})

describe('formatLifespan', () => {
  it('speaks plainly about short and long lives', () => {
    expect(formatLifespan(0)).toBe('less than a day')
    expect(formatLifespan(1)).toBe('1 day')
    expect(formatLifespan(23)).toBe('23 days')
    expect(formatLifespan(1421)).toBe('1,421 days')
  })
})

describe('formatDate', () => {
  it('writes the date the way it would be carved', () => {
    expect(formatDate('2011-03-14')).toBe('14 March 2011')
    expect(formatDate('2015-02-02')).toBe('2 February 2015')
    expect(formatDate('2020-12-31')).toBe('31 December 2020')
  })

  it('refuses a date it cannot read', () => {
    expect(() => formatDate('2011-3-14')).toThrow('Not an ISO date')
  })
})

describe('formatYears', () => {
  it('spans the years of a life', () => {
    expect(formatYears('2011-03-14', '2015-02-02')).toBe('2011–2015')
  })

  it('names a single year once', () => {
    expect(formatYears('2016-01-02', '2016-01-04')).toBe('2016')
  })

  it('leaves the end open for the undead', () => {
    expect(formatYears('2022-03-01', null)).toBe('2022–')
    expect(formatYears('2022-03-01')).toBe('2022–')
  })
})
