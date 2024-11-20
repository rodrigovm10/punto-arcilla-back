import { UpdateRoleDto } from '@domain/dtos'
import { AddressEntity, ProductEntity, ProfileEntity, UserEntity } from '@domain/entities'

export abstract class UserRepository {
  abstract getUser(id: string): Promise<UserEntity>

  abstract getAddress(id: string): Promise<AddressEntity>

  abstract getProfile(id: string): Promise<ProfileEntity>

  abstract getProducts(id: string): Promise<ProductEntity[]>

  abstract updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<UserEntity>
}
