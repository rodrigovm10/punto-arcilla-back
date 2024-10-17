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
  EMAIL_OR_PASSWORD_INCORRECT = 1003,
  PRODUCT_NOT_CREATED = 1004,
  MISSING_FIELD = 1005,
  THERE_ARE_NOT_PRODUCTS = 1006,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001
}
