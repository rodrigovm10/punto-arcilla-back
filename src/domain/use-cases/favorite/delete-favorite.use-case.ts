import { FavoriteDataSource } from '@domain/datasources'
import { FavoriteEntity } from '@domain/entities'

interface DeleteFavoriteUseCase {
  execute(userId: string, productId: string): Promise<FavoriteEntity[]>
}

export class DeleteFavorite implements DeleteFavoriteUseCase {
  constructor(private readonly favoriteRepository: FavoriteDataSource) {}

  async execute(userId: string, productId: string): Promise<FavoriteEntity[]> {
    const favorite = await this.favoriteRepository.deleteProduct(userId, productId)

    return favorite
  }
}
