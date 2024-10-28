import { Request, Response } from 'express'

import { CustomError } from '@domain/errors'
import { CreateAddressDto } from '@domain/dtos'
import { CreateAddress, GetAddressById } from '@domain/use-cases'
import { AddressRepository } from '@domain/repositories'

export class AddressController {
  constructor(private readonly addressRepository: AddressRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  getAddressById = (req: Request, res: Response) => {
    const id = req.params.id

    if (!id) return res.status(400).json({ error: 'Missing requiered parameter: id' })

    new GetAddressById(this.addressRepository)
      .execute(id)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  createAddress = (req: Request, res: Response) => {
    const [error, addressDto] = CreateAddressDto.create(req.body)

    if (error) return res.status(400).json({ error })

    new CreateAddress(this.addressRepository)
      .execute(addressDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
