import { createApp } from 'vue'
import App from './app.vue'
import { createFoxyRouter } from '@/router'
import { createHead } from '@vueuse/head'
import { checkClientId } from '@@/use-cases/auth'

checkClientId()

const router = createFoxyRouter()
const head = createHead()

createApp(App).use(router).use(head).mount('#app')
