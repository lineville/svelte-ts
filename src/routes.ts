// import Login from './views/public/login.svelte'
import VirusStats from './components/VirusStats/VirusStats.svelte'
import VirusTimeline from './components/VirusStats/VirusTimeline.svelte'
import CandyChomper from './components/ColorGrid/CandyChomper.svelte'
import ColorFill from './components/ColorGrid/ColorFill.svelte'
import Counter from './components/Misc/Counter.svelte'
import ProfitCalculator from './components/Misc/ProfitCalculator.svelte'
import SpeedTyper from './components/Misc/SpeedTyper.svelte'
import SquareRootBind from './components/Misc/SquareRootBind.svelte'
import BlackJack from './components/Misc/BlackJack.svelte'

const routes = [
  {
    name: '/',
    component: VirusStats,
  },
  {
    name: '/stats',
    component: VirusStats,
  },
  {
    name: '/timeline',
    component: VirusTimeline,
  },
  {
    name: '/colorfill',
    component: ColorFill,
  },
  {
    name: '/candychomper',
    component: CandyChomper,
  },
  {
    name: '/counter',
    component: Counter,
  },
  {
    name: '/profitcalculator',
    component: ProfitCalculator,
  },
  {
    name: '/speedtyper',
    component: SpeedTyper,
  },
  {
    name: '/squarerootbind',
    component: SquareRootBind,
  },
  {
    name: '/blackjack',
    component: BlackJack,
  }
]

export { routes }
