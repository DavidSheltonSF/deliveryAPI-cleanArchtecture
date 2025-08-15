import {dateToString} from './dateToString'

describe('Testing dateToString', () => {
  test('should return string data AAAA-MM-DD', () => {
    const dateStr = '2000-05-02'
    const date = new Date(dateStr)
    const formatedDate = dateToString(date)
    expect(formatedDate).toBe(dateStr)
  })
})