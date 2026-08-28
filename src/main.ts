import { createApp } from 'vue'
import App from './App.vue'
import { i18n, initLocaleMeta } from './i18n'
import { reveal } from './directives/reveal'
import './styles/main.css'

const app = createApp(App)
app.use(i18n)
app.directive('reveal', reveal)
app.mount('#app')

initLocaleMeta()
