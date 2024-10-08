import { User } from '@domain/entities'
import { AuthDataSource } from '@domain/datasources'
import { AuthRepository } from '@domain/repositories'
import { LoginUserDto, RegisterUserDto } from '@domain/dtos'

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDataSource) {}

  login(loginUserDto: LoginUserDto): Promise<User> {
    return this.authDatasource.login(loginUserDto)
  }

  register(registerUserDto: RegisterUserDto): Promise<User> {
    return this.authDatasource.register(registerUserDto)
  }
}
