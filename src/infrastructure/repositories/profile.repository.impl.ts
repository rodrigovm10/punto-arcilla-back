import { ProfileDataSource } from '@domain/datasources/profile.datasource'
import { CreateProfileDto, UpdateProfileDto } from '@domain/dtos'
import { ProfileEntity } from '@domain/entities'
import { ProfileRepository } from '@domain/repositories/profile.repository'

export class ProfileRepositoryImpl implements ProfileRepository {
  constructor(private readonly profileDataSource: ProfileDataSource) {}

  findById(id: string): Promise<ProfileEntity> {
    return this.profileDataSource.findById(id)
  }

  create(createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
    return this.profileDataSource.create(createProfileDto)
  }

  update(id: string, updateProfileDto: UpdateProfileDto): Promise<ProfileEntity> {
    return this.profileDataSource.update(id, updateProfileDto)
  }
}
