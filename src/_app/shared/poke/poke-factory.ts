import { HttpMethod } from '@@/shared/http-utils'

import { definePokeMethod, PokeMethodOptions } from './poke-method'
import { PokeResponse } from './poke-response'
import { PokeRequest } from './poke-request'

export type PokeFactoryOptions = {
  baseUrl: string
}

export class PokeFactory {
  baseUrl: string

  _beforeEach: Set<CallableFunction> = new Set()
  _onError: Set<CallableFunction> = new Set()

  constructor(options: PokeFactoryOptions) {
    this.baseUrl = options.baseUrl
  }

  defineContext(context: string) {
    return new PokeMethodFactory(context, this)
  }

  beforeEach(
    fn: (
      input: PokeRequest<unknown>,
    ) =>
      | Promise<PokeRequest<unknown>>
      | PokeRequest<unknown>
      | Promise<void>
      | void,
  ) {
    this._beforeEach.add(fn)

    return this
  }

  onError(fn: CallableFunction) {
    this._onError.add(fn)

    return this
  }

  removeOnError(fn: CallableFunction) {
    this._onError.delete(fn)
  }

  async _runBeforeEach<T>(input: PokeRequest<T>) {
    for await (const fn of this._beforeEach) {
      input = (await fn(input)) ?? input
    }

    return input
  }

  async _runOnError<T, E extends string>(response: PokeResponse<T, E>) {
    for await (const fn of this._onError) {
      await fn(response)
    }
  }
}

class PokeMethodFactory {
  context: string
  factory: PokeFactory

  constructor(context: string, factory: PokeFactory) {
    this.context = context
    this.factory = factory
  }

  defineMethod<InputDTO, OutputDTO>({
    httpMethod = HttpMethod.Post,
    methodPath,
  }: Omit<PokeMethodOptions, 'baseUrl' | 'before' | 'onError'>) {
    const fullMethodPath = `${this.context}/${methodPath}`

    return definePokeMethod<InputDTO, OutputDTO>({
      methodPath: fullMethodPath,
      httpMethod,
      baseUrl: this.factory.baseUrl,
      before: this.factory._runBeforeEach.bind(this.factory),
      onError: this.factory._runOnError.bind(this.factory),
    })
  }
}

export const createPokeFactory = (options: PokeFactoryOptions) =>
  new PokeFactory(options)
