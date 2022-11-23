import axios, { AxiosError, AxiosResponse } from 'axios'

import { CommonError, InternalError } from '@@/infrastructure/dto/errors'

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
    input: PokeRequest<InputDTO> = {},
  ): Promise<PokeResponse<OutputDTO, Error>> => {
    if (!input.skipBeforeHooks) {
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

    let result: PokeResponse<OutputDTO, Error>

    try {
      const { data } = (await axios(axiosOptions)) as AxiosResponse<
        PokeResponse<OutputDTO, Error>
      >

      result = data
    } catch (e) {
      const err = e as AxiosError

      if (
        !(err.response?.data as PokeResponse<OutputDTO, Error>)?.result?.reason
      ) {
        result = {
          status: PokeResponseStatus.Rejected,
          result: {
            reason: InternalError.Unknown,
          },
        }
      } else {
        result = (err.response?.data as PokeResponse<OutputDTO, Error>).result
      }
    }

    const expectAllErrors =
      typeof input.meta?.expectedErrors === 'boolean' &&
      input.meta.expectedErrors

    if (
      !expectAllErrors &&
      result.status === PokeResponseStatus.Rejected &&
      !((input.meta?.expectedErrors as string[]) ?? []).includes(
        result.result.reason,
      )
    ) {
      await options.onError(result)
    }

    return result
  }
