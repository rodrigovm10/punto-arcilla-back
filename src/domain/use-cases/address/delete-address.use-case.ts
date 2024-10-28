import { AddressRepository } from '@domain/repositories'

interface DeleteAddressUseCase {
  execute(id: string): Promise<string>
}

export class DeleteAddress implements DeleteAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  execute(id: string): Promise<string> {
    const message = this.addressRepository.delete(id)

    return message
  }
}
