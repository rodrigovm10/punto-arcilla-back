import { AddressEntity } from '@domain/entities'
import { AddressRepository } from '@domain/repositories'

interface GetAddressByIdUseCase {
  execute(id: string): Promise<AddressEntity | string>
}

export class GetAddressById implements GetAddressByIdUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(id: string): Promise<AddressEntity | string> {
    const address = await this.addressRepository.findByUserId(id)

    return address
  }
}
