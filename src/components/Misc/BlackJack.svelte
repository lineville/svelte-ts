<script lang="ts">
  // * Idea Build an AI mode that gives tips about actions to take based on strategy Grampa used when he played

  // * Stay on a lot of 13-16s follow basic strategy except for some splits and edge cases
  import { fly, fade } from 'svelte/transition'
  import CardList from './CardList.svelte'

  type Suite = '❤️' | '♦' | '♣️' | '♠️'
  type Card = {
    name: string
    value: number
    optionalValue: number | null
    suite: Suite
  }

  const suites: Array<Suite> = ['❤️', '♦', '♣️', '♠️']
  const blankCard: Card = { name: 'Blank', value: 20, optionalValue: 1, suite: '♠️' }

  // ------ Click Handlers ----------
  const hit = () => {
    userCards = [...userCards, deck.pop() || blankCard]
  }

  const handlePeek = () => {
    peekDealer = !peekDealer
  }

  const stay = () => {
    lockedIn = true
  }

  const nextHand = () => {
    handCompleted = false
    lockedIn = false
    canSplit = false
    deck = shuffle(newDeck())
    dealerCards = [deck.pop() || blankCard, deck.pop() || blankCard]
    userCards = [deck.pop() || blankCard, deck.pop() || blankCard]
  }

  // ------- Utils ------------
  const newDeck = (): Array<Card> => {
    let newDeck = []

    // Populate deck
    for (let i = 2; i <= 14; i++) {
      newDeck.push(indexToCard(i))
    }

    return newDeck
  }

  const shuffle = (deck: Array<Card>): Array<Card> => {
    return deck.sort(() => Math.random() - 0.5)
  }

  const indexToCard = (idx: number): Card => {
    switch (idx) {
      case 2:
        return { name: 'Two', value: idx, optionalValue: null, suite: suites[idx % suites.length] }
      case 3:
        return { name: 'Three', value: idx, optionalValue: null, suite: suites[idx % suites.length] }
      case 4:
        return { name: 'Four', value: idx, optionalValue: null, suite: suites[idx % suites.length] }
      case 5:
        return { name: 'Five', value: idx, optionalValue: null, suite: suites[idx % suites.length] }
      case 6:
        return { name: 'Six', value: idx, optionalValue: null, suite: suites[idx % suites.length] }
      case 7:
        return { name: 'Seven', value: idx, optionalValue: null, suite: suites[idx % suites.length] }
      case 8:
        return { name: 'Eight', value: idx, optionalValue: null, suite: suites[idx % suites.length] }
      case 9:
        return { name: 'Nine', value: idx, optionalValue: null, suite: suites[idx % suites.length] }
      case 10:
        return { name: 'Ten', value: idx, optionalValue: null, suite: suites[idx % suites.length] }
      case 11:
        return { name: 'Jack', value: 10, optionalValue: null, suite: suites[idx % suites.length] }
      case 12:
        return { name: 'Queen', value: 10, optionalValue: null, suite: suites[idx % suites.length] }
      case 13:
        return { name: 'King', value: 10, optionalValue: null, suite: suites[idx % suites.length] }
      case 14:
        return { name: 'Ace', value: 11, optionalValue: 1, suite: suites[idx % suites.length] }
      default:
        throw new Error('Bad card value')
    }
  }

  const cardToImage = (card: Card): string => {
    return card.value < 10 || card.name === 'Ten'
      ? card.value + suitePrefix(card.suite)
      : card.name[0] + suitePrefix(card.suite)
  }

  const suitePrefix = (suite: Suite): string => {
    switch (suite) {
      case '❤️':
        return 'H'
      case '♠️':
        return 'S'
      case '♣️':
        return 'C'
      case '♦':
        return 'D'
      default:
        throw new Error('Bad suite')
    }
  }

  // ----------- State -----------
  let balance = 100
  let bet = 10
  let peekDealer = false
  let handCompleted = false
  let lockedIn = false
  let deck = shuffle(newDeck())

  let dealerCards: Array<Card> = [deck.pop() || blankCard, deck.pop() || blankCard]
  let userCards: Array<Card> = [deck.pop() || blankCard, deck.pop() || blankCard]
  let userScore = 0
  $: userScore = userCards.reduce((acc, value) => acc + value.value, 0)
  let canSplit = userCards[0].name === userCards[1].name
</script>

<style>
  button {
    margin: 5px 5px 5px 5px;
  }

  :disabled {
    pointer-events: none;
  }

  .tag {
    margin-top: 5px;
  }

  #bet {
    width: 120px;
    margin-top: 5px;
  }

  .fa-dollar-sign {
    margin-bottom: 20px;
  }
</style>

<div class="columns is-mobile is-centered">
  <div class="column is-three-quarters">

    <h1 class="title">BlackJack</h1>
    <h2 class="subtitle">Dealer's Hand</h2>

    <CardList cards={dealerCards.map(c => cardToImage(c))} visible={peekDealer} />
    <hr />

    <h2 class="subtitle">Your Hand : {userScore}</h2>

    <CardList cards={userCards.map(c => cardToImage(c))} />

    <hr />

    <!-- Control Bar -->
    <div class="field is-horizontal" id="controlBar">
      <div>

        <span class="control has-icons-left">
          <input class="input is-info" type="number" id="bet" name="bet" bind:value={bet} />

          <span class="icon is-small is-left">
            <i class="fa fa-dollar-sign" />
          </span>
        </span>

        <button class="button is-primary is-outlined" on:click={hit} disabled={lockedIn}>
          <span>Hit</span>
          <span class="icon is-small">
            <i class="fas fa-check" />
          </span>
        </button>

        <button class="button is-danger is-outlined" on:click={stay}>
          <span>Stay</span>
          <span class="icon is-small">
            <i class="fas fa-hand-paper" />
          </span>
        </button>

        <button class="button is-warning is-outlined" disabled={!canSplit}>
          <span class="icon is-small">
            <i class="fas fa-arrow-left" />
          </span>
          <span>Split</span>
          <span class="icon is-small">
            <i class="fas fa-arrow-right" />
          </span>
        </button>

        <button class="button is-success is-outlined" disabled={lockedIn}>
          <span>Double Down</span>
          <span class="icon is-small">
            <i class="fas fa-coins" />
          </span>
        </button>

        <button class="button is-dark is-outlined" on:click={handlePeek}>

          <span>{peekDealer ? 'Play Clean' : 'Cheat'}</span>
          <span class="icon is-small">
            <i class="fas fa-eye" />
          </span>
        </button>

        <button class="button is-info is-outlined" on:click={nextHand}>
          <span>Next Hand</span>
          <span class="icon is-small">
            <i class="fas fa-angle-double-right" />
          </span>
        </button>

        <span class={`tag is-large ${balance >= 0 ? 'is-success' : 'is-danger'}`}>Balance: $ {balance}</span>
        {#if lockedIn}
          <span
            class="icon is-small"
            in:fly={{ x: 200, y: -200, duration: 1000 }}
            out:fly={{ x: 200, y: -200, duration: 1000 }}>
            <i class="fas fa-coins" />
          </span>
        {/if}

      </div>
    </div>
  </div>
</div>
