import { ProfileEntity } from '@domain/entities'
import { ProfileRepository } from '@domain/repositories/profile.repository'

interface GetProfileByIdUseCase {
  execute(id: string): Promise<ProfileEntity>
}

export class GetProfileById implements GetProfileByIdUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(id: string): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findById(id)

    return profile
  }
}
