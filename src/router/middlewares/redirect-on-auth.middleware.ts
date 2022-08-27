import { NavigationGuard } from 'vue-router'

import {
  AuthPage,
  PageAuthRequirements,
  RedirectDecision,
  shouldRedirect,
} from '@@/domain/auth'
import { exists } from '@@/shared/guards'
import { getAccessToken } from '@@/use-cases/auth'
import { CardsPage } from '@@/domain/cards'

export const redirectOnAuthMiddleware: NavigationGuard = (to, from, next) => {
  const accessToken = getAccessToken()

  const isAuthorized = exists(accessToken)

  const requirement = (to.meta.auth ?? undefined) as
    | PageAuthRequirements
    | undefined

  const decision = shouldRedirect(isAuthorized, requirement)

  switch (decision) {
    case RedirectDecision.ToAuth: {
      return next({
        name: AuthPage.SignIn,
      })
    }

    case RedirectDecision.ToIndex: {
      return next({
        name: CardsPage.Cards,
      })
    }
  }

  return next()
}
