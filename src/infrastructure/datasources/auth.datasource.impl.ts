import { BcryptAdapter } from '@config/index'
import { UserMapper } from '@infrastructure/mappers'
import { prisma } from '@data/postgresql/postgres-database'

import { UserEntity } from '@domain/entities'
import { AuthDataSource } from '@domain/datasources'
import { LoginUserDto, RegisterUserDto } from '@domain/dtos'
import { CustomError } from 'domain/errors'

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean
export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, password } = registerUserDto

    try {
      // 1. Verify if email exists
      const exists = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (exists) throw CustomError.badRequest('El usuario ya está registrado.')

      // 2. Hash password
      const hashedPassword = this.hashPassword(password)

      // 3. Create User
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword
        }
      })

      // 3. Map response to our entity
      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto

    try {
      // 1. Verify if email exists
      const dbUser = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!dbUser) throw CustomError.badRequest('Usuario no encontrado.')

      const passwordCorrect = this.comparePassword(password, dbUser?.password)

      if (!passwordCorrect)
        throw CustomError.badRequest('El correo o la contraseña son incorrectos.')

      // Get user
      return UserMapper.userEntityFromObject(dbUser)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }
}
