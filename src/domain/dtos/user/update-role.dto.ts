import { Role } from '@prisma/client'

export class UpdateRoleDto {
  private constructor(public role: Role) {}

  static create(object: { [key: string]: any }): [string?, UpdateRoleDto?] {
    const { role } = object

    if (!role) return ['Missing role']

    return [undefined, new UpdateRoleDto(role)]
  }
}
