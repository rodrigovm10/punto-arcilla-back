import { UpdateRoleDto } from '@domain/dtos'
import { UserEntity } from '@domain/entities'

export abstract class UserDataSource {
  abstract updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<UserEntity>
}
