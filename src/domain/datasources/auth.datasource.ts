import { User } from '../entities/user.entity'
import { RegisterUserDto } from '../dtos/auth/register-user.dto'

export abstract class AuthDataSource {
  // TODO:
  // abstract login(){}

  abstract register(registerUserDto: RegisterUserDto): Promise<User>
}
