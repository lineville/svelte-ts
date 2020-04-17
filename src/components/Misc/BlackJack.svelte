<script lang="ts">
  // * Idea Build an AI mode that gives tips about actions to take based on strategy Grampa used when he played

  // * Stay on a lot of 13-16s follow basic strategy except for some splits and edge cases

  import CardList from './CardList.svelte'

  type Suite = '❤️' | '♦' | '♣️' | '♠️'
  type Card = {
    name: string
    value: number
    optionalValue: number | null
    suite: Suite
  }

  // ----------- State -----------
  let balance = 100
  let bet = 10
  let peekDealer = false
  let handCompleted = false

  let dealerCards: Array<Card> = [
    { name: 'Two', value: 2, optionalValue: null, suite: '♠️' },
    { name: 'Jack', value: 10, optionalValue: null, suite: '❤️' },
  ]
  let userCards: Array<Card> = [
    { name: 'Ace', value: 11, optionalValue: 1, suite: '❤️' },
    { name: 'King', value: 10, optionalValue: null, suite: '♦' },
  ]

  // ------ Click Handlers ----------
  const hit = () => {
    userCards = [...userCards, { name: 'Ace', value: 11, optionalValue: 1, suite: '♠️' }]
  }

  // ------- Utils ------------
</script>

<style>
  button {
    margin: 5px 5px 5px 5px;
  }

  .disabled {
    pointer-events: none;
  }

  .tag {
    margin-top: 5px;
  }

  #bet {
    width: 120px;
    margin-top: 5px;
  }
</style>

<div class="columns is-mobile is-centered">
  <div class="column is-three-quarters">

    <h1 class="title">BlackJack</h1>

    <br />
    <h2 class="subtitle">Dealer Hand</h2>

    <CardList cards={dealerCards} visible={peekDealer} />

    <br />
    <hr />
    <br />

    <CardList cards={userCards} />

    <hr />

    <!-- Control Bar -->
    <div class="field is-horizontal" id="controlBar">
      <div>

        <span class="control has-icons-left">
          <input class="input is-info" type="number" id="bet" bind:value={bet} />

          <span class="icon is-small is-left">
            <i class="fa fa-dollar-sign" />
          </span>
        </span>

        <button class="button is-primary is-outlined" on:click={hit}>
          <span>Hit</span>
          <span class="icon is-small">
            <i class="fas fa-check" />
          </span>
        </button>

        <button class="button is-danger is-outlined">
          <span>Stay</span>
          <span class="icon is-small">
            <i class="fas fa-hand-paper" />
          </span>
        </button>

        <button class="button is-warning is-outlined disabled" disabled>
          <span class="icon is-small">
            <i class="fas fa-arrow-left" />
          </span>
          <span>Split</span>
          <span class="icon is-small">
            <i class="fas fa-arrow-right" />
          </span>
        </button>

        <button class="button is-success is-outlined">
          <span>Double Down</span>
          <span class="icon is-small">
            <i class="fas fa-coins" />
          </span>
        </button>

        <button class="button is-dark is-outlined" on:click={() => (peekDealer = !peekDealer)}>

          <span>{peekDealer ? 'Play Clean' : 'Cheat'}</span>
          <span class="icon is-small">
            <i class="fas fa-eye" />
          </span>
        </button>

        <span class="tag is-success is-large">Balance: $ {balance}</span>

        <button class="button is-info is-outlined">
          <span>Next Hand</span>
          <span class="icon is-small">
            <i class="fas fa-angle-double-right" />
          </span>
        </button>

      </div>
    </div>
  </div>
</div>
