import { CartEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'

export class CartMapper {
  static cartEntityFromObject(object: { [key: string]: any }) {
    const { id, user_id, cart_items } = object

    if (!id) throw CustomError.badRequest('Missing id')
    if (!user_id) throw CustomError.badRequest('Missing userId')
    if (!cart_items) throw CustomError.badRequest('Missing cart_items')

    return new CartEntity(id, user_id, cart_items)
  }
}
