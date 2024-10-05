import { Role } from '@prisma/client'

export class Validators {
  static get email() {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/
  }

  static role(roleInput: string) {
    return roleInput === Role.BUYER || roleInput === Role.SELLER
  }
}
