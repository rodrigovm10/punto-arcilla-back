import { UserEntity } from '@domain/entities'
import { RegisterUserDto, LoginUserDto } from '@domain/dtos'

export abstract class AuthRepository {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
}
