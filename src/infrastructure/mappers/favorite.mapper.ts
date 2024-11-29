import { FavoriteEntity, FavoriteProductEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'

export class FavoriteMapper {
  static favoriteEntityFromObject(object: { [key: string]: any }) {
    const { favorite_id, product_id } = object

    if (!favorite_id) throw CustomError.badRequest('Missing favorite_id')
    if (!product_id) throw CustomError.badRequest('Missing productId')

    return new FavoriteEntity(favorite_id, product_id)
  }

  static favoriteProductEntityFromObject(object: { [key: string]: any }) {
    const { favorite_id, product_id, product } = object

    if (!favorite_id) throw CustomError.badRequest('Missing favorite_id')
    if (!product_id) throw CustomError.badRequest('Missing productId')
    if (!product) throw CustomError.badRequest('Missing product')

    return new FavoriteProductEntity(favorite_id, product_id, product)
  }
}
