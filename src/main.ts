import { createApp } from 'vue'
import App from './app.vue'
import { createFoxyRouter } from '@/router'
import { createHead } from '@vueuse/head'
import { checkClientId } from '@@/use-cases/auth'
import { createPinia } from 'pinia'

checkClientId()

const router = createFoxyRouter()
const head = createHead()
const pinia = createPinia()

createApp(App).use(router).use(head).use(pinia).mount('#app')
