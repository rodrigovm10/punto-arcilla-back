import { Product } from '@prisma/client'

export class FavoriteProductEntity {
  constructor(public favorite_id: string, public product_id: string, public product: Product) {}
}
