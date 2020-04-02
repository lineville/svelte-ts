// import Login from './views/public/login.svelte'
import VirusStats from './components/VirusStats/VirusStats.svelte'
import VirusTimeline from './components/VirusStats/VirusTimeline.svelte'
import CandyChomper from './components/ColorGrid/CandyChomper.svelte'
import ColorFill from './components/ColorGrid/ColorFill.svelte'

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
    params: {
      width: 15,
      height: 15,
    },
  },
  {
    name: '/candychomper',
    component: CandyChomper,
    params: {
      width: 15,
      height: 15,
    },
  },
]

export { routes }
