import { ProfileEntity } from '@domain/entities'
import { UserRepository } from '@domain/repositories'

export interface GetProfileUseCase {
  execute(id: string): Promise<ProfileEntity>
}

export class GetProfile implements GetProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<ProfileEntity> {
    const profile = await this.userRepository.getProfile(id)

    return profile
  }
}
