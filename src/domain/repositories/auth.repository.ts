import { User } from '../entities/user.entity'
import { RegisterUserDto } from '../dtos/auth/register-user.dto'
import { LoginUserDto } from '../dtos/auth/login-user.dto'

export abstract class AuthRepository {
  abstract login(loginUserDto: LoginUserDto): Promise<User>

  abstract register(registerUserDto: RegisterUserDto): Promise<User>
}
