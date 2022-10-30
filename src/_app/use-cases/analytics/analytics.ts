import { plausibleClient } from '@@/infrastructure/plausible'
import { getClientId } from '@@/use-cases/auth'

type EventOptions = Record<string, unknown>

const getDefaultProps = () => ({
  clientId: getClientId(),
})

export const sendPageView = () => {
  plausibleClient.trackPageview(undefined, {
    props: { ...getDefaultProps() },
  })
}

export const sendEvent = (
  event: string,
  props: EventOptions = {},
  callback?: () => void,
) => {
  plausibleClient.trackEvent(event, {
    props: {
      ...getDefaultProps(),
      ...props,
    },
    callback,
  })
}
