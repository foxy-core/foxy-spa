import { isFunction } from '@@/shared/guards'

type MaybeFn<T> = (() => T) | T

export const executeOrGet = <T>(maybeFn: MaybeFn<T>) =>
  isFunction(maybeFn) ? maybeFn() : maybeFn
