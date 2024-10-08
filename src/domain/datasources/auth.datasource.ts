import { User } from '@domain/entities'
import { RegisterUserDto, LoginUserDto } from '@domain/dtos'

export abstract class AuthDataSource {
  abstract login(loginUserDto: LoginUserDto): Promise<User>

  abstract register(registerUserDto: RegisterUserDto): Promise<User>
}
