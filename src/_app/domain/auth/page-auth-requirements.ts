export enum PageAuthRequirements {
  Authorized,
  NotAuthorized,
  Whatever,
}

export enum RedirectDecision {
  ToIndex,
  ToAuth,
  None,
}

// Pages are mostly for the authorized
export const DEFAULT_PAGE_AUTH_REQUIREMENT = PageAuthRequirements.Authorized

export const shouldRedirect = (
  isAuthorized: boolean,
  requirement = DEFAULT_PAGE_AUTH_REQUIREMENT,
) => {
  switch (requirement) {
    case PageAuthRequirements.Authorized: {
      if (!isAuthorized) {
        return RedirectDecision.ToAuth
      }
      break
    }

    case PageAuthRequirements.NotAuthorized: {
      if (isAuthorized) {
        return RedirectDecision.ToIndex
      }
      break
    }
  }

  return RedirectDecision.None
}
