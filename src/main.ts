import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    name: 'Svelte Components',
  },
  hydrate: true,
})

export default app
