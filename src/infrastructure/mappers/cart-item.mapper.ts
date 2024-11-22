import { CartItemEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'

export class CartItemMapper {
  static cartItemEntityFromObject(object: { [key: string]: any }) {
    const { id, quantity, cart_id, product_id } = object

    if (!id) throw CustomError.badRequest('Missing id')
    if (!cart_id) throw CustomError.badRequest('Missing cartId')
    if (!product_id) throw CustomError.badRequest('Missing productId')
    if (!quantity) throw CustomError.badRequest('Missing quantity')

    return new CartItemEntity(id, cart_id, quantity, product_id)
  }
}
