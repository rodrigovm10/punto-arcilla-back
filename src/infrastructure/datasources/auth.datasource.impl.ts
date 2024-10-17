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
    const { name, email, password, role } = registerUserDto

    try {
      // 1. Verify if email exists
      const exists = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (exists) throw CustomError.badRequest('User already exists')

      // 2. Hash password
      const hashedPassword = this.hashPassword(password)

      // 3. Create User
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role
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

      if (!dbUser) throw CustomError.badRequest('User not found')

      const passwordCorrect = this.comparePassword(password, dbUser?.password)

      if (!passwordCorrect) throw CustomError.badRequest('Email or password is wrong')

      // Get user
      return UserMapper.userEntityFromObject(dbUser)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }
}
