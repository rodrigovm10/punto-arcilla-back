import { JwtAdapter } from '../../../config'
import { LoginUserDto } from '../../dtos/auth/login-user.dto'
import { CustomError } from '../../errors/custom.error'
import { InternalException } from '../../errors/internal-exception'
import { ErrorCode } from '../../errors/root'
import { AuthRepository } from '../../repositories/auth.repository'

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<any>
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<any> {
    // Get user
    const user = await this.authRepository.login(loginUserDto)
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
