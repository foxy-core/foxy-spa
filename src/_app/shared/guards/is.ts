export const isFunction = (fn: unknown): fn is CallableFunction =>
  typeof fn === 'function'
