import { AddressEntity } from '@domain/entities'
import { UserRepository } from '@domain/repositories'

interface GetAddressUseCase {
  execute(id: string): Promise<AddressEntity>
}

export class GetAddress implements GetAddressUseCase {
  constructor(private readonly userAddressRepository: UserRepository) {}

  async execute(id: string): Promise<AddressEntity> {
    const address = await this.userAddressRepository.getAddress(id)

    return address
  }
}
