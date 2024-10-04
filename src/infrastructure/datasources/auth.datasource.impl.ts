import { AuthDataSource, CustomError, RegisterUserDto, User } from '../../domain'

export class AuthDataSourceImpl implements AuthDataSource {
  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { username, email, password } = registerUserDto

    try {
      // 1. Verify if email exists

      // 2. Hash password

      // 3. Map response to our entity

      return new User('1', username, email, password, 'BUYER')
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }
}
