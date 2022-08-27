export enum PokeResponseStatus {
  Resolved = 'resolved',
  Rejected = 'rejected',
}

export type PokeError<R extends string, E> = { reason: R } & E

export type PokeResponse<OutputDTO, ErrorReason extends string> =
  | {
      status: PokeResponseStatus.Resolved
      result: OutputDTO
    }
  | {
      status: PokeResponseStatus.Rejected
      // TODO: types for error data to avoid using `as`?
      result: PokeError<ErrorReason, any>
    }
