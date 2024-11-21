import { UpdateRoleDto } from '@domain/dtos'
import { CustomError } from '@domain/errors'
import { AddressMapper, ProductMapper, ProfileMapper, UserMapper } from '@infrastructure/mappers'
import { UserDataSource } from '@domain/datasources'
import { AddressEntity, ProductEntity, ProfileEntity, UserEntity } from '@domain/entities'
import { prisma } from '@data/postgresql/postgres-database'

export class UserDataSourceImpl implements UserDataSource {
  async getProfile(id: string): Promise<ProfileEntity> {
    try {
      const user = await prisma.user.findFirst({
        where: { id }
      })

      if (!user) throw CustomError.notFound('El usuario no existe.')

      const profile = await prisma.profile.findFirst({
        where: {
          user_id: id
        }
      })

      if (!profile) throw CustomError.notFound('Este usuario no tiene un perfil creado.')

      return ProfileMapper.profileEntityFromObject(profile)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }

  async getAddress(id: string): Promise<AddressEntity> {
    try {
      const user = await prisma.user.findFirst({
        where: { id }
      })

      if (!user) throw CustomError.notFound('El usuario no existe.')

      const address = await prisma.address.findFirst({
        where: {
          user_id: id
        }
      })

      if (!address) throw CustomError.notFound('No hay direcciones creadas para este usuario.')

      return AddressMapper.addressEntityFromObject(address)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }

  async getUser(id: string): Promise<UserEntity> {
    try {
      const user = await prisma.user.findFirst({
        where: { id }
      })

      if (!user) throw CustomError.notFound('El usuario no existe.')

      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }

  async getProducts(id: string): Promise<ProductEntity[]> {
    try {
      const user = await prisma.user.findFirst({
        where: { id }
      })

      if (!user) throw CustomError.notFound('El usuario no existe.')

      const products = await prisma.product.findMany({
        where: {
          user_id: user.id
        }
      })
      if (products.length === 0) throw CustomError.notFound('No hay productos.')

      return products.map(product => ProductMapper.productEntityFromObject(product))
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<UserEntity> {
    try {
      const userExists = await prisma.user.findFirst({
        where: {
          id
        }
      })

      if (!userExists) throw CustomError.notFound('El usuario no fue encontrado.')

      const userUpdated = await prisma.user.update({
        where: {
          id
        },
        data: {
          role: updateRoleDto.role
        }
      })

      return UserMapper.userEntityFromObject(userUpdated)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }
}
