import { CreateReservedDto } from '@domain/dtos'
import { CustomError } from '@domain/errors'
import { ReservedRepository } from '@domain/repositories'
import {
  GetCustomerReserved,
  GetRecipientReserved,
  CreateReserved,
  DeleteReserved,
  UpdateReservedStatus
} from '@domain/use-cases'
import { Request, Response } from 'express'

export class ReservedController {
  constructor(private readonly reservedRepository: ReservedRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createReserved = (req: Request, res: Response) => {
    const [error, reservedDto] = CreateReservedDto.create(req.body)

    if (error) return res.status(400).json({ error })

    new CreateReserved(this.reservedRepository)
      .execute(reservedDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  getCustomerReserved = (req: Request, res: Response) => {
    const customerId = req.params.customerId

    if (!customerId) return res.status(400).json({ error: 'No hay id de usuario' })

    new GetCustomerReserved(this.reservedRepository)
      .execute(customerId)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  getRecipientReserved = (req: Request, res: Response) => {
    const recipientId = req.params.recipientId

    if (!recipientId) return res.status(400).json({ error: 'No hay id de usuario' })

    new GetRecipientReserved(this.reservedRepository)
      .execute(recipientId)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  updateReservedStatus = (req: Request, res: Response) => {
    const reservedId = req.params.reservedId

    if (!reservedId) return res.status(400).json({ error: 'No hay id de apartado' })

    new UpdateReservedStatus(this.reservedRepository)
      .execute(reservedId, req.body.status)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  deleteReserved = (req: Request, res: Response) => {
    const reservedId = req.params.reservedId

    if (!reservedId) return res.status(400).json({ error: 'No hay id de apartado' })

    new DeleteReserved(this.reservedRepository)
      .execute(reservedId)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
