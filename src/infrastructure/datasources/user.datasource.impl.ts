import { prisma } from '@data/postgresql/postgres-database'
import { UserDataSource } from '@domain/datasources'
import { UpdateRoleDto } from '@domain/dtos'
import { UserEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'
import { UserMapper } from '@infrastructure/mappers'

export class UserDataSourceImpl implements UserDataSource {
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
