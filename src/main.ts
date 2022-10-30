import './styles/index.css'

import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { createFoxyRouter } from '@/router'
import { checkClientId } from '@@/use-cases/auth'

import App from './app.vue'

checkClientId()

const router = createFoxyRouter()
const head = createHead()
const pinia = createPinia()

createApp(App).use(router).use(head).use(pinia).mount('#app')
