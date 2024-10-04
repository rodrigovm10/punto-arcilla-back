import { BcryptAdapter } from '../../config'
import { prisma } from '../../data/postgresql/postgres-database'
import { AuthDataSource, CustomError, RegisterUserDto, User } from '../../domain'
import { UserMapper } from '../mappers/user.mapper'

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean
export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password, role } = registerUserDto

    try {
      // 1. Verify if email exists
      const exists = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (exists) throw CustomError.badRequest('User already exist')

      // 2. Hash password
      const hashedPassword = this.hashPassword(password)

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
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }
}
