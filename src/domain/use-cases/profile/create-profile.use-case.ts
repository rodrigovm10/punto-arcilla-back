import { CreateProfileDto } from '@domain/dtos'
import { ProfileRepository } from '@domain/repositories/profile.repository'

interface Profile {
  created: boolean
  profile: {
    id: string
    name: string
    bussinessDescription?: string
    avatar?: string
  }
}

interface CreateProfileUseCase {
  execute(createProfileDto: CreateProfileDto): Promise<Profile>
}

export class CreateProfile implements CreateProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = await this.profileRepository.create(createProfileDto)

    return {
      created: true,

      profile: {
        id: profile.id,
        name: profile.name,
        bussinessDescription: profile.business_description,
        avatar: profile.avatar
      }
    }
  }
}
