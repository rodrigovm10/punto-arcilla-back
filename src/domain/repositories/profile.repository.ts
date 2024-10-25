import { CreateProfileDto, UpdateProfileDto } from '@domain/dtos'
import { ProfileEntity } from '@domain/entities'

export abstract class ProfileRepository {
  abstract create(profileDto: CreateProfileDto): Promise<ProfileEntity>

  abstract update(id: string, updateProfileDto: UpdateProfileDto): Promise<ProfileEntity>
}
