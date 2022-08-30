import { createRouter, createWebHistory } from 'vue-router'
import { redirectOnAuthMiddleware } from './middlewares'
import {
  _404Routes,
  authRoutes,
  accountRoutes,
  profilesRoutes,
  cardsRoutes,
  sparksRoutes,
} from './routes'

export const createFoxyRouter = () => {
  const router = createRouter({
    routes: [
      ...authRoutes,
      ...accountRoutes,
      ...profilesRoutes,
      ...cardsRoutes,
      ...sparksRoutes,
      ..._404Routes,
    ],
    history: createWebHistory(),
  })

  router.beforeEach(redirectOnAuthMiddleware)

  return router
}
