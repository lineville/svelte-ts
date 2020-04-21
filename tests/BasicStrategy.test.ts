import { expect } from 'chai'
import { decideMove, shouldSplit, shouldDouble, shouldHit } from '../src/utils/BasicStrategy'

describe('Basic Strategy', () => {
  it('should split aces', () => {
    const result = shouldSplit(
      [
        { name: 'Ace', value: 11, optionalValue: 1, suite: '♦' },
        { name: 'Ace', value: 11, optionalValue: 1, suite: '♣️' },
      ],
      { name: 'Ten', value: 10, optionalValue: null, suite: '♠️' },
    )
    expect(result).to.be.true
  })

  it('should not split tens', () => {
    const result = shouldSplit(
      [
        { name: 'Ten', value: 10, optionalValue: null, suite: '♦' },
        { name: 'Ten', value: 10, optionalValue: null, suite: '♣️' },
      ],
      { name: 'Ten', value: 10, optionalValue: null, suite: '♠️' },
    )
    expect(result).to.be.false
  })

  it('should double on 9 with dealer 6', () => {
    const result = shouldDouble(
      [
        { name: 'Five', value: 5, optionalValue: null, suite: '♦' },
        { name: 'Four', value: 4, optionalValue: null, suite: '♣️' },
      ],
      { name: 'Six', value: 6, optionalValue: null, suite: '♠️' },
    )
    expect(result).to.be.true
  })

  it('should not double on 9 with dealer 7', () => {
    const result = shouldDouble(
      [
        { name: 'Five', value: 5, optionalValue: null, suite: '♦' },
        { name: 'Four', value: 4, optionalValue: null, suite: '♣️' },
      ],
      { name: 'Seven', value: 7, optionalValue: null, suite: '♠️' },
    )
    expect(result).to.be.false
  })

  it('should double on Ace 4 with dealer 6', () => {
    const result = shouldDouble(
      [
        { name: 'Ace', value: 11, optionalValue: 1, suite: '♦' },
        { name: 'Four', value: 4, optionalValue: null, suite: '♣️' },
      ],
      { name: 'Six', value: 6, optionalValue: null, suite: '♠️' },
    )
    expect(result).to.be.true
  })

  it('should not double on Ace 4 with dealer 7', () => {
    const result = shouldDouble(
      [
        { name: 'Ace', value: 11, optionalValue: 1, suite: '♦' },
        { name: 'Four', value: 4, optionalValue: null, suite: '♣️' },
      ],
      { name: 'Seven', value: 7, optionalValue: null, suite: '♠️' },
    )
    expect(result).to.be.false
  })

  it('should hit Ace 7 with dealer 9', () => {
    const result = shouldHit(
      [
        { name: 'Ace', value: 11, optionalValue: 1, suite: '♦' },
        { name: 'Seven', value: 7, optionalValue: null, suite: '♠️' },
      ],
      { name: 'Nine', value: 9, optionalValue: null, suite: '♠️' },
    )
    expect(result).to.be.true
  })

  it('should not hit Ace 7 with dealer 8', () => {
    const result = shouldHit(
      [
        { name: 'Ace', value: 11, optionalValue: 1, suite: '♦' },
        { name: 'Seven', value: 7, optionalValue: null, suite: '♠️' },
      ],
      { name: 'Eight', value: 8, optionalValue: null, suite: '♠️' },
    )
    expect(result).to.be.false
  })

  it('should hit hard 16 with dealer 7', () => {
    const result = shouldHit(
      [
        { name: 'Eight', value: 8, optionalValue: null, suite: '♠️' },
        { name: 'Eight', value: 8, optionalValue: null, suite: '♠️' },
      ],
      { name: 'Seven', value: 7, optionalValue: null, suite: '♠️' },
    )
    expect(result).to.be.true
  })

  it('should not hit hard 16 with dealer 6', () => {
    const result = shouldHit(
      [
        { name: 'Eight', value: 8, optionalValue: null, suite: '♠️' },
        { name: 'Eight', value: 8, optionalValue: null, suite: '♠️' },
      ],
      { name: 'Six', value: 6, optionalValue: null, suite: '♠️' },
    )
    expect(result).to.be.false
  })
})
