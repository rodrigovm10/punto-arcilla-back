import { UpdateRoleDto } from '@domain/dtos'
import { UserEntity } from '@domain/entities'
import { UserRepository } from '@domain/repositories'

interface User {
  user: {
    id: string
    email: string
    role: string | undefined
  }
}

interface UpdateRoleUseCase {
  execute(id: string, updateRoleDto: UpdateRoleDto): Promise<User>
}

export class UpdateRole implements UpdateRoleUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, updateRoleDto: UpdateRoleDto): Promise<User> {
    const roleUpdated = await this.userRepository.updateRole(id, updateRoleDto)

    return { user: { id: roleUpdated.id, email: roleUpdated.email, role: roleUpdated.role } }
  }
}
