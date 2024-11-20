import { Request, Response } from 'express'

import { CustomError } from '@domain/errors'
import { UpdateRoleDto } from '@domain/dtos'
import { UserRepository } from '@domain/repositories'
import { UpdateRole, GetUser, GetAddress, GetProfile, GetProducts } from '@domain/use-cases'

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  getUser = (req: Request, res: Response) => {
    const id = req.params.id

    if (!id) throw CustomError.badRequest('Missing required paramater: id')

    new GetUser(this.userRepository)
      .execute(id)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  getProfile = (req: Request, res: Response) => {
    const id = req.params.id

    if (!id) throw CustomError.badRequest('Missing required paramater: id')

    new GetProfile(this.userRepository)
      .execute(id)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  getAddress = (req: Request, res: Response) => {
    const id = req.params.id

    if (!id) throw CustomError.badRequest('Missing required paramater: id')

    new GetAddress(this.userRepository)
      .execute(id)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  getProducts = (req: Request, res: Response) => {
    const id = req.params.id

    if (!id) throw CustomError.badRequest('Missing required paramater: id')

    new GetProducts(this.userRepository)
      .execute(id)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  updateRole = (req: Request, res: Response) => {
    const [error, roleDto] = UpdateRoleDto.create(req.body)

    if (error) return res.status(400).json({ error })

    const id = req.params.id

    if (!id) res.status(400).json({ error: 'Missing required parameter: id' })

    new UpdateRole(this.userRepository)
      .execute(id, roleDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
