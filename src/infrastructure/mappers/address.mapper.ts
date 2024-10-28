import { AddressEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'

export class AddressMapper {
  static addressEntityFromObject(object: { [key: string]: any }) {
    const { id, user_id, city, house_number, neighborhood, postal_code, state, street } = object

    if (!user_id) throw CustomError.badRequest('Missing userId')
    if (!street) throw CustomError.badRequest('Missing street')
    if (!city) throw CustomError.badRequest('Missing city')
    if (!state) throw CustomError.badRequest('Missing state')
    if (!neighborhood) throw CustomError.badRequest('Missing neighborhood')
    if (!postal_code) throw CustomError.badRequest('Missing postalCode')
    if (!house_number) throw CustomError.badRequest('Missing houseNumber')

    return new AddressEntity(
      id,
      user_id,
      street,
      city,
      state,
      neighborhood,
      postal_code,
      house_number
    )
  }
}
