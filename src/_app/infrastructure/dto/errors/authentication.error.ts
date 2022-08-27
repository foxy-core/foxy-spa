export enum AuthenticationError {
  BadCredentials = 'BAD_CREDENTIALS',
  UserNotFound = 'USER_NOT_FOUND',
  MissingRefreshToken = 'MISSING_REFRESH_TOKEN',
  MissingOldAccessToken = 'MISSING_OLD_ACCESS_TOKEN',
  InvalidOldAccessToken = 'INVALID_OLD_ACCESS_TOKEN',
  InvalidAuthPayload = 'INVALID_AUTH_PAYLOAD',
  InvalidRefreshToken = 'INVALID_REFRESH_TOKEN',
  UnsupportedStrategy = 'UNSUPPORTED_STRATEGY',
  AccountAlreadyExists = 'ACCOUNT_ALREADY_EXISTS',
  CantSolvePassword = 'CANT_SOLVE_PASSWORD',
}
