<script lang="ts">
  // * Idea Build an AI mode that gives tips about actions to take based on strategy Grampa used when he played

  // * Stay on a lot of 13-16s follow basic strategy except for some splits and edge cases
  import { fly, slide } from 'svelte/transition'
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
    const newCard = deck[0]
    deck = deck.slice(1)
    userCards = [...userCards, newCard]
    userScore = userCards.reduce((acc, value) => acc + value.value, 0)
    // Check for bust
    if (isBusted()) {
      lockedIn = true
    }
  }

  const handlePeek = () => {
    peekDealer = !peekDealer
  }

  const stay = () => {
    lockedIn = true
    dealerTurn = true

    // * TODO Check who actually won (dealer needs to play out hand based on simple rules)
    // dealerCards = playOutDealerHand(dealerCards)

    if (isDealerBusted()) {
      balance += bet * 2
    }

    balance += bet * 2
  }

  const nextHand = () => {
    balance -= bet
    handCompleted = false
    lockedIn = false
    canSplit = false
    userCards = [deck[0], deck[2]]
    dealerCards = [deck[1], deck[3]]
    deck = deck.slice(4)
    if (deck.length < 15) {
      deck = shuffle(newDeck())
    }
  }

  const splitHand = () => {
    // TODO need to hanlde hitting / staying per hand and math this is more involved
    leftHand = [userCards[0]]
    rightHand = [userCards[1]]
    // userCards = []
    split = true
  }

  const toggleHint = () => {
    hintEnabled = !hintEnabled
  }

  const hit1 = () => {
    const newCard = deck[0]
    deck = deck.slice(1)
    leftHand = [...leftHand, newCard]
  }

  const hit2 = () => {
    const newCard = deck[0]
    deck = deck.slice(1)
    rightHand = [...rightHand, newCard]
  }

  const doubleDown = () => {
    bet *= 2
    hit()
    stay()
    bet /= 2
  }

  // ------- Utils ------------
  const newDeck = (): Array<Card> => {
    let result = new Array<Card>()

    // Populate deck
    suites.forEach(suite => {
      for (let i = 2; i <= 14; i++) {
        result.push(indexToCard(i, suite))
      }
    })

    return result
  }

  const shuffle = (deck: Array<Card>): Array<Card> => {
    return deck.sort(() => Math.random() - 0.5)
  }

  const indexToCard = (idx: number, suite: Suite): Card => {
    switch (idx) {
      case 2:
        return { name: 'Two', value: idx, optionalValue: null, suite: suite }
      case 3:
        return { name: 'Three', value: idx, optionalValue: null, suite: suite }
      case 4:
        return { name: 'Four', value: idx, optionalValue: null, suite: suite }
      case 5:
        return { name: 'Five', value: idx, optionalValue: null, suite: suite }
      case 6:
        return { name: 'Six', value: idx, optionalValue: null, suite: suite }
      case 7:
        return { name: 'Seven', value: idx, optionalValue: null, suite: suite }
      case 8:
        return { name: 'Eight', value: idx, optionalValue: null, suite: suite }
      case 9:
        return { name: 'Nine', value: idx, optionalValue: null, suite: suite }
      case 10:
        return { name: 'Ten', value: idx, optionalValue: null, suite: suite }
      case 11:
        return { name: 'Jack', value: 10, optionalValue: null, suite: suite }
      case 12:
        return { name: 'Queen', value: 10, optionalValue: null, suite: suite }
      case 13:
        return { name: 'King', value: 10, optionalValue: null, suite: suite }
      case 14:
        return { name: 'Ace', value: 11, optionalValue: 1, suite: suite }
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

  const isBusted = (): boolean => {
    // * TODO handle aces
    return userScore > 21
  }

  const isDealerBusted = (): boolean => {
    // * TODO handle aces
    return dealerScore > 21
  }

  // ----------- State -----------

  let balance = 100
  let bet = 10
  let peekDealer = false
  let handCompleted = false
  let lockedIn = false
  let split = false
  let canSplit = false
  let hintEnabled = false
  let dealerTurn = false
  let hint = "Don't hit everything okay now! Anything 12 and above is dangerous territory."

  let deck = shuffle(newDeck())
  let userScore: number
  let dealerScore: number
  let dealerCards: Array<Card> = [deck.pop() || blankCard, deck.pop() || blankCard]
  let userCards: Array<Card> = [deck.pop() || blankCard, deck.pop() || blankCard]
  $: userScore = userCards.reduce((acc, value) => acc + value.value, 0)
  $: dealerScore = dealerCards.reduce((acc, value) => acc + value.value, 0)
  $: canSplit = userCards[0].name === userCards[1].name
  let leftHand: Array<Card> = []
  let rightHand: Array<Card> = []
</script>

<style>
  button {
    margin: 5px 5px 5px 5px;
  }

  li {
    margin-left: 15px;
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

  #upNext {
    margin-top: 80px;
  }

  #controlBar {
    margin-left: 20vw;
  }
</style>

<div class="columns is-mobile is-centered">
  <div class="column is-11">

    <h1 class="title is-centered">BlackJack</h1>

    <h2 class="subtitle">{peekDealer ? `Dealer's Hand : ${dealerScore}` : `Dealer's Hand`}</h2>

    <CardList cards={dealerCards.map(c => cardToImage(c))} visible={peekDealer || lockedIn} />
    <hr />

    <h2 class="subtitle">Your Hand : {userScore > 0 ? userScore : ''}</h2>

    {#if split}
      <ul>
        <CardList cards={leftHand.map(c => cardToImage(c))} />
        <span style="display:inline-block; width: 200px;" />
        <CardList cards={rightHand.map(c => cardToImage(c))} />
      </ul>
    {:else}
      <CardList cards={userCards.map(c => cardToImage(c))} />
    {/if}

    <hr />

    <!-- Control Bar -->
    <div class="is-centered" id="controlBar">
      <div class="field is-horizontal">
        <div>

          <span class="control has-icons-left">
            <input class="input is-info" type="number" id="bet" name="bet" bind:value={bet} disabled={!lockedIn} />

            <span class="icon is-small is-left">
              <i class="fa fa-dollar-sign" />
            </span>
          </span>

          {#if split}
            <button class="button is-primary is-outlined" on:click={hit1} disabled={lockedIn}>
              <span>Hit 1</span>
              <span class="icon is-small">
                <i class="fas fa-hand-holding-medical" />
              </span>
            </button>
            <button class="button is-primary is-outlined" on:click={hit2} disabled={lockedIn}>
              <span>Hit 2</span>
              <span class="icon is-small">
                <i class="fas fa-hand-holding-medical" />
              </span>
            </button>
          {:else}
            <button class="button is-primary is-outlined" on:click={hit} disabled={lockedIn}>
              <span>Hit</span>
              <span class="icon is-small">
                <i class="fas fa-hand-holding-medical" />
              </span>
            </button>
          {/if}

          {#if split}
            <button class="button is-danger is-outlined" on:click={stay}>
              <span>Stay 1</span>
              <span class="icon is-small">
                <i class="fas fa-hand-paper" />
              </span>
            </button>
            <button class="button is-danger is-outlined" on:click={stay}>
              <span>Stay 2</span>
              <span class="icon is-small">
                <i class="fas fa-hand-paper" />
              </span>
            </button>
          {:else}
            <button class="button is-danger is-outlined" on:click={stay}>
              <span>Stay</span>
              <span class="icon is-small">
                <i class="fas fa-hand-paper" />
              </span>
            </button>
          {/if}

          <button
            class="button is-success is-outlined"
            on:click={doubleDown}
            disabled={lockedIn || userCards.length !== 2}>
            <span>Double Down</span>
            <span class="icon is-small">
              <i class="fas fa-coins" />
            </span>
          </button>

          <button class="button is-warning is-outlined" on:click={splitHand} disabled={!canSplit || split}>
            <span>Split</span>
            <span class="icon is-small">
              <i class="fas fa-expand-alt" />
            </span>
          </button>

        </div>

      </div>

      <div class="field is-horizontal">
        <div>

          <button class="button is-dark is-outlined" on:click={handlePeek}>

            <span>{peekDealer ? 'Play Clean' : 'Cheat'}</span>
            <span class="icon is-small">
              <i class={`fas fa-eye${peekDealer ? '-slash' : ''}`} />
            </span>
          </button>

          <span class={`tag is-large ${balance >= 0 ? 'is-success' : 'is-danger'}`}>Balance: $ {balance}</span>

          {#if lockedIn && !isBusted()}
            <span class="icon is-small" in:fly={{ y: -500, duration: 500 }} out:fly={{ x: 500, duration: 500 }}>
              <i class="fas fa-coins" />
            </span>
          {/if}

          <button
            class="button is-primary has-tooltip-multiline"
            id="hint"
            on:click={toggleHint}
            data-tooltip="Helpful hint">
            <span>{hintEnabled ? 'Fly Solo' : 'Ask Don'}</span>
            <span class="icon is-small">
              <i class={`fas fa-${hintEnabled ? 'plane' : 'question-circle'}`} />
            </span>
          </button>

          {#if hintEnabled}
            <span class="tag is-info is-light is-medium subtitle" transition:fly={{ y: 1000, duration: 500 }}>
              {hint}
            </span>
          {/if}

        </div>

      </div>
    </div>

    <!-- Message Fly-In -->
    {#if lockedIn}
      <div
        class={`notification is-narrow ${isBusted() ? 'is-danger' : 'is-success'}`}
        transition:fly={{ x: -1000, duration: 500, delay: 500 }}>
        <span id="wonOrLost">
          <strong>{isBusted() ? 'You Busted!' : 'You Won!'}</strong>
        </span>
        <button class="button is-info is-outlined is-light" on:click={nextHand}>
          <span>Next Hand</span>
          <span class="icon is-small">
            <i class="fas fa-angle-double-right" />
          </span>
        </button>
      </div>
    {/if}
  </div>

  <!-- Deck to Peek from -->
  {#if peekDealer}
    <div class="column is-1">
      <ul>
        {#each deck.slice(0, 5).reverse() as card, idx (card)}
          <li key={card} transition:slide>
            <figure class="image is-64x64">
              <img src={`/images/${cardToImage(card)}.jpg`} alt="playing card" />
            </figure>
          </li>
        {/each}
      </ul>
      <span class="tag is-primary is-light is-medium" id="upNext">
        <span class="icon">
          <i class="fas fa-arrow-up" />
        </span>
        <p class="subtitle">Up Next</p>
      </span>
    </div>
  {/if}
</div>
