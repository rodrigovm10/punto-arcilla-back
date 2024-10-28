import { CreateAddressDto } from '@domain/dtos'
import { AddressEntity } from '@domain/entities'
import { AddressDataSource } from '@domain/datasources'
import { prisma } from '@data/postgresql/postgres-database'
import { CustomError } from '@domain/errors'
import { AddressMapper } from '@infrastructure/mappers'

export class AddressDataSourceImpl implements AddressDataSource {
  async create(createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    const { userId, city, houseNumber, neighborhood, postalCode, state, street } = createAddressDto

    try {
      // 1. Verify if user exists
      const userExists = await prisma.user.findFirst({
        where: {
          id: userId
        }
      })

      if (!userExists) throw CustomError.notFound('El usuario no existe')

      // 2. Register user
      const address = await prisma.addresses.create({
        data: {
          user_id: userId,
          city,
          house_number: houseNumber,
          neighborhood,
          postal_code: postalCode,
          state,
          street
        }
      })

      return AddressMapper.addressEntityFromObject(address)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw error
    }
  }
}
