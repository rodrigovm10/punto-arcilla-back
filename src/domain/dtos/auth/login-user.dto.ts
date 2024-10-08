export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object

    if (!email) return ['Missing email']
    if (!password) return ['Missing password']
    if (password.lenght < 6) ['Password too short']

    return [undefined, new LoginUserDto(email, password)]
  }
}
