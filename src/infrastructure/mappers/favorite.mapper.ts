import { FavoriteEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'

export class FavoriteMapper {
  static favoriteEntityFromObject(object: { [key: string]: any }) {
    const { favorite_id, product_id } = object

    if (!favorite_id) throw CustomError.badRequest('Missing favorite_id')
    if (!product_id) throw CustomError.badRequest('Missing productId')

    return new FavoriteEntity(favorite_id, product_id)
  }
}
