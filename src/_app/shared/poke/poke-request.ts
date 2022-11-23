export type PokeRequest<InputDTO> = {
  input?: InputDTO
  meta?: PokeRequestMeta
  /** @default false */
  skipBeforeHooks?: boolean
}

export type PokeRequestMeta = {
  accessToken?: string
  expectedErrors?: string[] | boolean
}
