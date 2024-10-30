import { UserDataSource } from '@domain/datasources'
import { UpdateRoleDto } from '@domain/dtos'
import { UserEntity } from '@domain/entities'
import { UserRepository } from '@domain/repositories'

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}

  updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<UserEntity> {
    return this.userDataSource.updateRole(id, updateRoleDto)
  }
}
