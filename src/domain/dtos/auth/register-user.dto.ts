import { Role } from '@prisma/client'
import { Validators } from '@config/index'

export class RegisterUserDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { email, password } = object

    if (!email) return ['Missing email']
    if (!Validators.email.test(email)) return ['Email is not valid']
    if (!password) return ['Missing password']
    if (password.lenght < 6) return ['Password too short']
    // if (!Validators.role(role.toUpperCase())) return ['Role does not exist']

    return [undefined, new RegisterUserDto(email, password)]
  }
}
