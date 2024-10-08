export class HttpException extends Error {
  public readonly message: string
  public readonly errorCode: any
  public readonly statusCode: number
  public readonly errors: ErrorCode

  constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any) {
    super(message)
    this.message = message
    this.errorCode = errorCode
    this.statusCode = statusCode
    this.errors = errors
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003
}
