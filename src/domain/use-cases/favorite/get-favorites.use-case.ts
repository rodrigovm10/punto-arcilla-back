import { FavoriteDataSource } from '@domain/datasources'
import { FavoriteEntity, ProductEntity } from '@domain/entities'

interface GetFavoritesUseCase {
  execute(userId: string): Promise<FavoriteEntity>
}

export class GetFavorite implements GetFavoritesUseCase {
  constructor(private readonly favoriteRepository: FavoriteDataSource) {}

  async execute(userId: string): Promise<FavoriteEntity> {
    const favorite = await this.favoriteRepository.getFavorites(userId)

    return favorite
  }
}
