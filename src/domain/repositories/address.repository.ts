import { CreateAddressDto } from '@domain/dtos'
import { AddressEntity } from '@domain/entities'

export abstract class AddressRepository {
  abstract findByUserId(id: string): Promise<AddressEntity>

  abstract create(createAddressDto: CreateAddressDto): Promise<AddressEntity>
}
