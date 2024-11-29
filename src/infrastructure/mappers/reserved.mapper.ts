import { ReservedEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'

export class ReservedMapper {
  static reservedEntityFromObject(object: { [key: string]: any }) {
    const { id, customer_id, recipient_id, status, product_id } = object

    if (!id) throw CustomError.badRequest('Missing ID')
    if (!customer_id) throw CustomError.badRequest('Missing customer_id')
    if (!recipient_id) throw CustomError.badRequest('Missing recipient_id')
    if (!product_id) throw CustomError.badRequest('Missing product_id')
    if (!status) throw CustomError.badRequest('Missing status')

    return new ReservedEntity(id, product_id, customer_id, recipient_id, status)
  }
}
