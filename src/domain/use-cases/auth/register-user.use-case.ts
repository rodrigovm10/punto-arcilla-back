import { JwtAdapter } from '@config/index'
import { CustomError } from '@domain/errors'
import { RegisterUserDto } from '@domain/dtos'
import { AuthRepository } from '@domain/repositories'
import { Role } from '@prisma/client'

interface UserToken {
  token: string
  user: {
    id: string
    email: string
    role: Role | undefined
  }
}

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    // Crear usuario
    const user = await this.authRepository.register(registerUserDto)

    // Token
    const token = await this.signToken({ id: user.id })

    if (!token) throw CustomError.internalServer('Error generating token')

    return {
      token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    }
  }
}
