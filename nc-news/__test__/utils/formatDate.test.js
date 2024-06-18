const { formatDate } = require('../../src/Utils/formatDate')

describe('formatDate', () => {
  it('should format a valid date string to a readable format', () => {
    const input = '2020-10-05T23:23:00.000Z'
    const expectedOutput = 'October 5, 2020'
    expect(formatDate(input)).toBe(expectedOutput)
  })

  it('should handle an invalid date string gracefully', () => {
    const input = 'invalid-date'
    expect(() => formatDate(input)).toThrow()
  })

  it('should return "Invalid Date" for an empty string', () => {
    const input = ''
    expect(formatDate(input)).toBe('Invalid Date')
  })
})
