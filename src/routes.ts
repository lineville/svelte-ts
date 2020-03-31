// import Login from './views/public/login.svelte'
import VirusStats from './components/VirusStats/VirusStats.svelte'
import VirusTimeline from './components/VirusStats/VirusTimeline.svelte'
import CandyChomper from './components/ColorGrid/CandyChomper.svelte'
import ColorFill from './components/ColorGrid/ColorFill.svelte'
import Home from './components/Home.svelte'

const userIsAdmin = (): boolean => {
  return true
}

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
]

export { routes }
