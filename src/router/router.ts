import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router'

import { sendPageView } from '@@/use-cases/analytics'

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

  router.afterEach((_to, _from, failure) => {
    if (!isNavigationFailure(failure)) {
      sendPageView()
    }
  })

  return router
}
