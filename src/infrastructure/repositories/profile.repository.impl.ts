import { ProfileEntity } from '@domain/entities'
import { ProfileDataSource } from '@domain/datasources'
import { ProfileRepository } from '@domain/repositories'
import { CreateProfileDto, UpdateProfileDto } from '@domain/dtos'

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
