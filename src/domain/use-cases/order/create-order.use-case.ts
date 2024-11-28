import { CreateOrderDto } from '@domain/dtos/order/create-order.dto'
import { OrderRepository } from '@domain/repositories'
import { Status } from '@prisma/client'

interface Order {
  order: {
    id: string
    user_id: string
    status: Status
    total_amount: number
  }
}

interface CreateOrderUseCase {
  execute(createCartDto: CreateOrderDto): Promise<Order>
}

export class CreateOrder implements CreateOrderUseCase {
  constructor(private readonly cartRepository: OrderRepository) {}

  async execute(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.cartRepository.create(createOrderDto)

    return {
      order: {
        id: order.id,
        user_id: order.user_id,
        status: order.status,
        total_amount: order.total_amount
      }
    }
  }
}
