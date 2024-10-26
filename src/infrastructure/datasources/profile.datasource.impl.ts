import { CustomError } from '@domain/errors'
import { ProfileEntity } from '@domain/entities'
import { prisma } from '@data/postgresql/postgres-database'
import { CreateProfileDto, UpdateProfileDto } from '@domain/dtos'
import { ProfileMapper } from '@infrastructure/mappers/profile.mapper'
import { ProfileDataSource } from '@domain/datasources/profile.datasource'

export class ProfileDataSourceImpl implements ProfileDataSource {
  async findById(id: string): Promise<ProfileEntity> {
    try {
      const profile = await prisma.profile.findFirst({
        where: {
          user_id: id
        }
      })

      if (!profile) throw CustomError.notFound('Perfil no encontrado.')

      return ProfileMapper.profileEntityFromObject(profile)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw error
    }
  }

  async create(createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
    const { userId, name, avatar, businessDescription } = createProfileDto

    try {
      // 1. Get user
      const userExists = await prisma.user.findFirst({
        where: {
          id: userId
        }
      })

      // 2. Verify if user exist
      // 3. If user does not exists send error
      if (!userExists) throw CustomError.notFound('Usuario no encontrado')

      // 4. Check user rol
      const isRoleSeller = userExists.role === 'SELLER'

      // 5. If user rol === SELLER add businnes_description
      if (isRoleSeller && businessDescription) {
        const profile = await prisma.profile.create({
          data: {
            user_id: userId,
            name,
            business_description: businessDescription,
            avatar
          }
        })
        return ProfileMapper.profileEntityFromObject(profile)
      }

      if (!isRoleSeller && businessDescription)
        throw CustomError.badRequest(
          'No puedes añadir una descripción de negocio si no perteneces al rol de vendedor'
        )

      // 6. If user rol === BUYER
      const profile = await prisma.profile.create({
        data: {
          user_id: userId,
          name,
          avatar
        }
      })
      return ProfileMapper.profileEntityFromObject(profile)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }

  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<ProfileEntity> {
    const { avatar, name, businessDescription } = updateProfileDto
    try {
      // 1. profileExists
      const profileExists = await prisma.profile.findFirst({
        where: {
          id
        }
      })
      // 2. If not exists throw error
      if (!profileExists) throw CustomError.notFound('El perfil no existe')
      // 3. If exists update profile
      const profileUpdated = await prisma.profile.update({
        where: { id },
        data: { business_description: businessDescription, avatar, name }
      })

      return ProfileMapper.profileEntityFromObject(profileUpdated)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw error
    }
  }
}
