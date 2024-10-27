import { AddressEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'

export class AddressMapper {
  static addressEntityFromObject(object: { [key: string]: any }) {
    const { id, userId, city, houseNumber, neighborhood, postalCode, state, street } = object

    if (!userId) throw CustomError.badRequest('Missing userId')
    if (!street) throw CustomError.badRequest('Missing street')
    if (!city) throw CustomError.badRequest('Missing city')
    if (!state) throw CustomError.badRequest('Missing state')
    if (!neighborhood) throw CustomError.badRequest('Missing neighborhood')
    if (!postalCode) throw CustomError.badRequest('Missing postalCode')
    if (!houseNumber) throw CustomError.badRequest('Missing houseNumber')

    return new AddressEntity(id, userId, street, city, state, neighborhood, postalCode, houseNumber)
  }
}
