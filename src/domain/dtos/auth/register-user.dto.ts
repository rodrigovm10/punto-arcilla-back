import { Validators } from '../../../config'

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password, role } = object

    if (!name) return ['Missing name']
    if (!email) return ['Missing email']
    if (!Validators.email.test(email)) return ['Email is not valid']
    if (!password) return ['Missing password']
    if (password.lenght < 6) return ['Password too short']
    if (!role) return ['Missing role']
    if (!Validators.role(role.toUpperCase())) return ['Role does not exist']

    return [undefined, new RegisterUserDto(name, email, password, role.toUpperCase())]
  }
}
