import { JwtAdapter } from '@config/index'
import { RegisterUserDto } from '@domain/dtos'
import { AuthRepository } from '@domain/repositories'
import { InternalException, ErrorCode } from '@domain/errors'

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
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

    if (!token)
      throw new InternalException(
        'Internal Server Error',
        'Error generating token',
        ErrorCode.INTERNAL_EXCEPTION
      )

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }
}
