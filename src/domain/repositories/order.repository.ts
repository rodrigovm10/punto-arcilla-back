import { CreateOrderDto } from '@domain/dtos/order/create-order.dto'
import { OrderEntity } from '@domain/entities'

export abstract class OrderRepository {
  abstract create(createOrderDto: CreateOrderDto): Promise<OrderEntity>

  abstract getOrder(userId: string): Promise<OrderEntity>
}
