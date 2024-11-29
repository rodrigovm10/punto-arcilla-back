import { prisma } from '@data/postgresql/postgres-database'
import { ReservedDataSource } from '@domain/datasources'
import { CreateReservedDto } from '@domain/dtos'
import { ReservedEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'
import { ReservedMapper } from '@infrastructure/mappers'
import { ReservedStatus } from '@prisma/client'

export class ReservedDataSourceImpl implements ReservedDataSource {
  async create(reservedDto: CreateReservedDto): Promise<ReservedEntity> {
    const { customerId, productId, recipientId } = reservedDto

    try {
      const product = await prisma.product.findFirst({
        where: {
          id: productId
        }
      })

      if (!product) throw CustomError.notFound('Producto no existente')

      if (!product.can_be_reserved)
        throw CustomError.badRequest('El producto no peude ser reservado')

      const reserved = await prisma.reserved.create({
        data: {
          product_id: productId,
          customer_id: customerId,
          recipient_id: recipientId
        }
      })

      return ReservedMapper.reservedEntityFromObject(reserved)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }

  async updateStatusReservation(
    reservedId: string,
    status: ReservedStatus
  ): Promise<ReservedEntity> {
    try {
      const reserved = await prisma.reserved.findUnique({
        where: {
          id: reservedId
        }
      })

      if (!reserved) throw CustomError.notFound('Apartado no existente')

      const reservedUpdated = await prisma.reserved.update({
        data: {
          status
        },
        where: {
          id: reservedId
        }
      })

      return ReservedMapper.reservedEntityFromObject(reservedUpdated)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }
  async deleteReservation(reservedId: string): Promise<ReservedEntity> {
    try {
      const reserved = await prisma.reserved.findUnique({
        where: {
          id: reservedId
        }
      })

      if (!reserved) throw CustomError.notFound('Apartado no existente')

      const reservedDeleted = await prisma.reserved.delete({
        where: {
          id: reservedId
        }
      })

      return ReservedMapper.reservedEntityFromObject(reservedDeleted)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }
  async getCustomerReservation(customerId: string): Promise<ReservedEntity[]> {
    try {
      const reserved = await prisma.reserved.findMany({
        where: {
          customer_id: customerId
        }
      })

      if (reserved.length === 0) throw CustomError.notFound('No hay apartados para el usuario')

      return reserved.map(item => ReservedMapper.reservedEntityFromObject(item))
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }

  async getRecipientReservation(recipientId: string): Promise<ReservedEntity[]> {
    try {
      const reserved = await prisma.reserved.findMany({
        where: {
          recipient_id: recipientId
        }
      })

      if (reserved.length === 0) throw CustomError.notFound('No hay apartados para el usuario')

      return reserved.map(item => ReservedMapper.reservedEntityFromObject(item))
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }
}
