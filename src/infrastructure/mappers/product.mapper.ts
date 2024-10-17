import { ProductEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'

export class ProductMapper {
  static productEntityFromObject(object: { [key: string]: any }) {
    const { id, name, user_id, description, price, images, status, stock, tags } = object

    if (!id) throw CustomError.badRequest('Missing ID')
    if (!name) throw CustomError.badRequest('Missing name')
    if (!description) throw CustomError.badRequest('Missing description')
    if (!price) throw CustomError.badRequest('Missing price')
    if (!images) throw CustomError.badRequest('Missing images')
    if (!status) throw CustomError.badRequest('Missing status')
    if (!stock) throw CustomError.badRequest('Missing stock')
    if (!tags) throw CustomError.badRequest('Missing tags')

    return new ProductEntity(id, user_id, name, description, stock, price, status, tags, images)
  }
}
