import { UserEntity } from '@domain/entities'
import { UserRepository } from '@domain/repositories'

interface GetUserUseCase {
  execute(id: string): Promise<UserEntity>
}

export class GetUser implements GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.getUser(id)

    return user
  }
}

// Get user
// Get profile
// Get address
