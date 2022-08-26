import { generateClientId } from '@@/domain/auth'

import { getClientId, setClientId } from './cookies'

export const checkClientId = () => {
  const existing = getClientId()

  if (!existing) {
    setClientId(generateClientId())
  }
}
