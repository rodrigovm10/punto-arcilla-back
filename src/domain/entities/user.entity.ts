import { Role } from '@prisma/client'

export class UserEntity {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role?: Role,
    public name?: string
  ) {}
}
