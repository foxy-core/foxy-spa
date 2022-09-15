import { getClientId } from '@@/use-cases/auth'
import { plausibleClient } from '@@/infrastructure/plausible'

type EventOptions = Record<string, any>

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
