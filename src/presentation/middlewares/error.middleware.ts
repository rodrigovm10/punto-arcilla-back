import { NextFunction, Request, Response } from 'express'
import { ErrorCode, HttpException, InternalException } from '@domain/errors'

export class ErrorMiddleware {
  static error = (error: HttpException | any, req: Request, res: Response) => {
    const statusCode = error.statusCode // Código de estado por defecto (500)

    // Verifica si es una instancia de HttpException
    if (error instanceof HttpException) {
      return res.status(statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors
      })
    }

    // Si no es HttpException, responde con un error genérico
    return new InternalException('Something went wrong', error, ErrorCode.INTERNAL_EXCEPTION)
  }
}
