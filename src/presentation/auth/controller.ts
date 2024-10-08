import { NextFunction, Request, Response } from 'express'

import { prisma } from '@data/postgresql/postgres-database'

import { AuthRepository } from '@domain/repositories'
import { RegisterUser, LoginUser } from '@domain/use-cases'
import { LoginUserDto, RegisterUserDto } from '@domain/dtos'
import { ErrorCode, UnprocessableEntity } from '@domain/errors'

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  registerUser = (req: Request, res: Response, next: NextFunction) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)
    if (error)
      next(new UnprocessableEntity(error, 'Unprocessable entity', ErrorCode.UNPROCESSABLE_ENTITY))

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then(data => res.json(data))
      .catch(error => next(error)) // Usa next para pasar el error al middleware
  }

  loginUser = (req: Request, res: Response, next: NextFunction) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body)
    if (error)
      next(new UnprocessableEntity(error, 'Unprocessable entity', ErrorCode.UNPROCESSABLE_ENTITY))

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then(data => res.json(data))
      .catch(error => next(error)) // Usa next para pasar el error al middleware
  }

  getUsers = (req: Request, res: Response, next: NextFunction) => {
    prisma.user
      .findMany()
      .then(users => {
        res.json({ users })
      })
      .catch(error => next(error)) // Usa next para pasar el error al middleware
  }
}
