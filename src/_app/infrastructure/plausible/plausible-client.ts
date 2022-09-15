import Plausible from 'plausible-tracker'

const plausibleClient = Plausible({
  apiHost: 'https://analytic.s.talkiiing.ru',
  domain: 'foxy.talkiiing.ru',
})

plausibleClient.enableAutoOutboundTracking()

export { plausibleClient }
