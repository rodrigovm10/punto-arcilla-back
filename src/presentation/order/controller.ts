import { CreateOrderDto } from '@domain/dtos/order/create-order.dto'
import { CustomError } from '@domain/errors'
import { OrderRepository } from '@domain/repositories'
import { CreateOrder } from '@domain/use-cases'
import { Request, Response } from 'express'

export class OrderController {
  constructor(private readonly orderRepository: OrderRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createOrder = (req: Request, res: Response) => {
    const [error, orderDto] = CreateOrderDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new CreateOrder(this.orderRepository)
      .execute(orderDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
