import { ProductEntity } from './product.entity'

export class FavoriteEntity {
  constructor(public favorite_id: string, public product_id: string) {}
}
