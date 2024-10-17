import { BcryptAdapter } from '@config/index'
import { UserMapper } from '@infrastructure/mappers'
import { prisma } from '@data/postgresql/postgres-database'

import { UserEntity } from '@domain/entities'
import { AuthDataSource } from '@domain/datasources'
import { LoginUserDto, RegisterUserDto } from '@domain/dtos'
import { BadRequestException, NotFoundException, ErrorCode } from 'domain/errors'

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

      if (exists)
        throw new BadRequestException('User already exists', ErrorCode.USER_ALREADY_EXISTS)

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
      throw error
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

      if (!dbUser) throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND)

      const passwordCorrect = this.comparePassword(password, dbUser?.password)

      if (!passwordCorrect)
        throw new BadRequestException(
          'Email or password is wrong',
          ErrorCode.EMAIL_OR_PASSWORD_INCORRECT
        )

      // Get user
      return UserMapper.userEntityFromObject(dbUser)
    } catch (error) {
      throw error
    }
  }
}
