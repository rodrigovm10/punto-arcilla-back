import { OrderDataSource } from '@domain/datasources'
import { CreateOrderDto } from '@domain/dtos/order/create-order.dto'
import { OrderEntity } from '@domain/entities'
import { OrderRepository } from '@domain/repositories'

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly orderDatasource: OrderDataSource) {}
  create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.orderDatasource.create(createOrderDto)
  }
  getOrder(userId: string): Promise<OrderEntity> {
    return this.orderDatasource.getOrder(userId)
  }
}
