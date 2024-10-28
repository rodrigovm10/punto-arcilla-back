import { CreateAddressDto } from '@domain/dtos'
import { AddressRepository } from '@domain/repositories'

interface Address {
  address: {
    id: string
    street: string
    city: string
    state: string
    neighborhood: string
    postalCode: number
    houseNumber: number
  }
}

interface CreateAddressUseCase {
  execute(createAddressDto: CreateAddressDto): Promise<Address>
}

export class CreateAddress implements CreateAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = await this.addressRepository.create(createAddressDto)

    return {
      address: {
        id: address.id,
        street: address.street,
        city: address.city,
        state: address.state,
        neighborhood: address.neighborhood,
        postalCode: address.postalCode,
        houseNumber: address.houseNumber
      }
    }
  }
}
