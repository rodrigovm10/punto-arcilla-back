import { CreateCartDto } from '@domain/dtos'
import { CustomError } from '@domain/errors'
import { CartRepository } from '@domain/repositories'
import { CreateCart } from '@domain/use-cases'
import { Request, Response } from 'express'

export class CartController {
  constructor(private readonly cartRepository: CartRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createCart = (req: Request, res: Response) => {
    const [error, cartDto] = CreateCartDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new CreateCart(this.cartRepository)
      .execute(cartDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  deleteProductFromCart = (req: Request, res: Response) => {}
}
