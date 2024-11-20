import { UserDataSource } from '@domain/datasources'
import { UpdateRoleDto } from '@domain/dtos'
import { AddressEntity, ProductEntity, ProfileEntity, UserEntity } from '@domain/entities'
import { UserRepository } from '@domain/repositories'

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}

  getUser(id: string): Promise<UserEntity> {
    return this.userDataSource.getUser(id)
  }

  getAddress(id: string): Promise<AddressEntity> {
    return this.userDataSource.getAddress(id)
  }

  getProfile(id: string): Promise<ProfileEntity> {
    return this.userDataSource.getProfile(id)
  }

  getProducts(id: string): Promise<ProductEntity[]> {
    return this.userDataSource.getProducts(id)
  }

  updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<UserEntity> {
    return this.userDataSource.updateRole(id, updateRoleDto)
  }
}
