import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../../domain/errors/root'

export class ErrorMiddleware {
  static error = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
      errors: error.errors
    })
  }
}
