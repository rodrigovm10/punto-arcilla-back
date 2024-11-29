import { CreateFavoriteDto } from '@domain/dtos'
import { FavoriteEntity } from '@domain/entities'

export abstract class FavoriteDataSource {
  abstract create(favoriteDto: CreateFavoriteDto): Promise<FavoriteEntity>

  abstract getFavorites(userId: string): Promise<FavoriteEntity[]>

  abstract deleteProduct(userId: string, productId: string): Promise<FavoriteEntity[]>
}
