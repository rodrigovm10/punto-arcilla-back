import { CreateProfileDto, UpdateProfileDto } from '@domain/dtos'
import { ProfileEntity } from '@domain/entities'

export abstract class ProfileDataSource {
  abstract create(createProfileDto: CreateProfileDto): Promise<ProfileEntity>

  abstract update(id: string, updateProfileDto: UpdateProfileDto): Promise<ProfileEntity>
}
