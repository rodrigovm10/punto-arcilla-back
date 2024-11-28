import { OrderEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'

export class OrderMapper {
  static orderEntityFromObject(object: { [key: string]: any }) {
    const { id, user_id, status, total_amount, cart_id, user_id_seller } = object

    if (!id) throw CustomError.badRequest('Missing id')
    if (!user_id) throw CustomError.badRequest('Missing userId')
    if (!total_amount) throw CustomError.badRequest('Missing total amount')
    if (!status) throw CustomError.badRequest('Missing status')
    if (!cart_id) throw CustomError.badRequest('Missing cart_items')
    if (!user_id_seller) throw CustomError.badRequest('Missing user_id_seller')

    return new OrderEntity(id, user_id, status, total_amount, cart_id, user_id_seller)
  }
}
