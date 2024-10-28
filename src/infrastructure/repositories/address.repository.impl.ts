import { AddressDataSource } from '@domain/datasources'
import { CreateAddressDto } from '@domain/dtos'
import { AddressEntity } from '@domain/entities'
import { AddressRepository } from '@domain/repositories'

export class AddressRepositoryImpl implements AddressRepository {
  constructor(private readonly addressDatasource: AddressDataSource) {}

  create(createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    return this.addressDatasource.create(createAddressDto)
  }
}
