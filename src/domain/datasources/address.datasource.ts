import { CreateAddressDto } from '@domain/dtos'
import { AddressEntity } from '@domain/entities'

export abstract class AddressDataSource {
  abstract findAllByUserId(): Promise<AddressEntity[]>

  abstract create(createAddressDto: CreateAddressDto): Promise<AddressEntity>
}
