import { CreateAddressDto } from '@domain/dtos'
import { AddressEntity } from '@domain/entities'

export abstract class AddressDataSource {
  abstract create(createAddressDto: CreateAddressDto): Promise<AddressEntity>
}
