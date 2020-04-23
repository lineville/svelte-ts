// * Implements basic strategy and indicates the optimal next move based on
// * user cards and dealer up card. Will return an Option

type Decision = 'Hit' | 'Stay' | 'DoubleDown' | 'Split'
type Suite = '❤️' | '♦' | '♣️' | '♠️'
type Card = {
  name: string
  value: number
  optionalValue: number | null
  suite: Suite
}

const splitTable = [
  [false, false, true, true, true, true, false, false, false, false], // 2's
  [false, false, true, true, true, true, false, false, false, false], // 3's
  [false, false, false, false, false, false, false, false, false, false], // 4's
  [false, false, false, false, false, false, false, false, false, false], // 5's
  [true, true, true, true, true, false, false, false, false, false], // 6's
  [true, true, true, true, true, true, false, false, false, false], // 7's
  [true, true, true, true, true, true, true, true, true, true], // 8's
  [true, true, true, true, true, false, true, true, false, false], // 9's
  [false, false, false, false, false, false, false, false, false, false], // 10's
  [true, true, true, true, true, true, true, true, true, true], // Aces
]

const softTable = [
  ['Hit', 'Hit', 'Hit', 'DoubleDown', 'DoubleDown', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit'],
  ['Hit', 'Hit', 'Hit', 'DoubleDown', 'DoubleDown', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit'],
  ['Hit', 'Hit', 'DoubleDown', 'DoubleDown', 'DoubleDown', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit'],
  ['Hit', 'Hit', 'DoubleDown', 'DoubleDown', 'DoubleDown', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit'],
  ['Hit', 'DoubleDown', 'DoubleDown', 'DoubleDown', 'DoubleDown', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit'],
  ['DoubleDown', 'DoubleDown', 'DoubleDown', 'DoubleDown', 'DoubleDown', 'Stay', 'Stay', 'Hit', 'Hit', 'Hit'],
  ['Stay', 'Stay', 'Stay', 'Stay', 'DoubleDown', 'Stay', 'Stay', 'Stay', 'Stay', 'Stay'],
  ['Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Stay'],
]

const hardTable = [
  ['Hit', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit'],
  ['Hit', 'DoubleDown', 'DoubleDown', 'DoubleDown', 'DoubleDown', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit'],
  [
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'Hit',
    'Hit',
  ],
  [
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
    'DoubleDown',
  ],
  ['Hit', 'Hit', 'Stay', 'Stay', 'Stay', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit'],
  ['Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit'],
  ['Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit'],
  ['Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit'],
  ['Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Hit', 'Hit', 'Hit', 'Hit', 'Hit'],
  ['Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Stay', 'Stay'],
]

export const decideMove = (userCards: Array<Card>, dealerUpCard: Card): Decision => {
  if (computeScore(userCards) > 17) {
    return 'Stay'
  }

  if (shouldSplit(userCards, dealerUpCard)) {
    return 'Split'
  }

  if (shouldDouble(userCards, dealerUpCard)) {
    return 'DoubleDown'
  }

  if (computeScore(userCards) < 8) {
    return 'Hit'
  }

  if (shouldHit(userCards, dealerUpCard)) {
    return 'Hit'
  }

  return 'Stay'
}

export const shouldSplit = (userCards: Array<Card>, dealerUpCard: Card): boolean => {
  // * Splitting is possible
  if (userCards.length === 2 && userCards[0].name === userCards[1].name) {
    return splitTable[userCards[0].value - 2][dealerUpCard.value - 2]
  }
  return false
}

export const shouldDouble = (userCards: Array<Card>, dealerUpCard: Card): boolean => {
  if (userCards.length === 2) {
    if (userCards.filter((c) => c.name === 'Ace').length > 0) {
      const nonAceCard = userCards.filter((c) => c.name !== 'Ace')[0]
      return softTable[nonAceCard.value - 2][dealerUpCard.value - 2] === 'DoubleDown'
    } else {
      if (computeScore(userCards) < 9 || computeScore(userCards) > 11) {
        return false
      }
      return hardTable[computeScore(userCards) - 8][dealerUpCard.value - 2] === 'DoubleDown'
    }
  }

  return false
}

const isHardHand = (hand: Array<Card>): boolean => {
  if (hand.filter((c) => c.name === 'Ace').length === 0) {
    return true
  } else {
    const hardCards = hand.filter((c) => c.name !== 'Ace')
    if (computeScore(hardCards) > 9) {
      return true
    }
  }

  return false
}

export const shouldHit = (userCards: Array<Card>, dealerUpCard: Card): boolean => {
  if (isHardHand(userCards)) {
    return hardTable[computeScore(userCards) - 8][dealerUpCard.value - 2] === 'Hit'
  } else {
    const hardCards = userCards.filter((c) => c.name !== 'Ace')
    return softTable[computeScore(hardCards) - 2][dealerUpCard.value - 2] === 'Hit'
  }
}

export const computeScore = (cards: Array<Card>): number => {
  let highestScore = cards.reduce((acc, value) => acc + value.value, 0)
  if (highestScore <= 21) {
    return highestScore
  }

  const numberOfAces = cards.filter((card) => card.optionalValue !== null).length
  for (let i = 0; i < numberOfAces; i++) {
    highestScore -= 10
    if (highestScore <= 21) {
      return highestScore
    }
  }
  return highestScore
}