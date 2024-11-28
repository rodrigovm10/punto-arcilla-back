import { prisma } from '@data/postgresql/postgres-database'
import { OrderDataSource } from '@domain/datasources'
import { CreateOrderDto } from '@domain/dtos/order/create-order.dto'
import { OrderEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'
import { OrderMapper } from '@infrastructure/mappers/order.mapper'

export class OrderDataSourceImpl implements OrderDataSource {
  async getOrder(userId: string) {
    try {
      const order = await prisma.order.findFirst({
        where: {
          user_id: userId
        }
      })

      if (!order) throw CustomError.notFound('Orden no encontrada.')

      return OrderMapper.orderEntityFromObject(order)
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw error
    }
  }

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const { cartId, status, totalAmount, userId, userIdSeller } = createOrderDto

    try {
      const cart = await prisma.cart.findFirst({
        where: {
          id: cartId
        }
      })

      if (!cart) throw CustomError.notFound('Carrito no existente.')

      const order = await prisma.order.create({
        data: {
          user_id: userId,
          status,
          total_amount: totalAmount,
          cart_id: cartId,
          user_id_seller: userIdSeller
        }
      })

      return OrderMapper.orderEntityFromObject(order)
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw error
    }
  }
}
