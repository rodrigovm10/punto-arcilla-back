import { UpdateProfileDto } from '@domain/dtos'
import { ProfileRepository } from '@domain/repositories/profile.repository'

interface Profile {
  updated: boolean
  profile: {
    id: string
    bussinessDescription?: string
    avatar?: string
  }
}

interface UpdateProfileUseCase {
  execute(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile>
}

export class UpdateProfile implements UpdateProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}
  async execute(id: string, profileDto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.profileRepository.update(id, profileDto)

    return {
      updated: true,
      profile: {
        id: profile.id,
        bussinessDescription: profile.business_description,
        avatar: profile.avatar
      }
    }
  }
}
