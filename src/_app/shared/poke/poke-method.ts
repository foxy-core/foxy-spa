import { CommonError, InternalError } from '@@/infrastructure/dto/errors'
import axios, { AxiosResponse } from 'axios'

import { HttpMethod } from '../http-utils'
import { PokeRequest } from './poke-request'
import { PokeResponse, PokeResponseStatus } from './poke-response'

export type PokeMethodOptions = {
  baseUrl: string
  methodPath: string
  httpMethod: HttpMethod
  onError: CallableFunction
  before: CallableFunction
}

export const definePokeMethod =
  <InputDTO, OutputDTO, Error extends string = CommonError | InternalError>(
    options: PokeMethodOptions,
  ) =>
  async (
    input: PokeRequest<InputDTO>,
  ): Promise<PokeResponse<OutputDTO, Error>> => {
    try {
      input = (await options.before(input)) ?? input
    } catch (e) {
      return {
        status: PokeResponseStatus.Rejected,
        result: {
          reason: InternalError.Unknown,
        },
      }
    }

    const axiosOptions = {
      method: options.httpMethod,
      headers: {
        Authorization: input.meta?.accessToken
          ? `Bearer ${input.meta.accessToken}`
          : '',
      },
      baseURL: options.baseUrl,
      data: input.input,
      url: `/${options.methodPath}`,
      validateStatus: () => true,
    }

    const { data } = (await axios(axiosOptions)) as AxiosResponse<
      PokeResponse<OutputDTO, Error>
    >

    if (data.status === PokeResponseStatus.Rejected) {
      await options.onError(data)
    }

    return data
  }
