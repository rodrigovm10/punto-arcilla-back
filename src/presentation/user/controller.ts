import { Request, Response } from 'express'

import { CustomError } from '@domain/errors'
import { UserRepository } from '@domain/repositories'
import { UpdateRole } from '@domain/use-cases'
import { UpdateRoleDto } from '@domain/dtos'

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  updateRole = (req: Request, res: Response) => {
    const [error, roleDto] = UpdateRoleDto.create(req.body)

    if (error) return res.status(400).json({ error })

    const id = req.params.id

    if (!id) res.status(400).json({ error: 'Missing required parameter; id' })

    new UpdateRole(this.userRepository)
      .execute(id, roleDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
