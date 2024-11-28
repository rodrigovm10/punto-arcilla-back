import { FavoriteDataSource } from '@domain/datasources'
import { CreateFavoriteDto } from '@domain/dtos'
import { ProductEntity } from '@domain/entities'

interface Favorite {
  favorite: {
    favoriteId: string
    productId: string
  }
}

interface CreateFavoriteUseCase {
  execute(createFavoriteDto: CreateFavoriteDto): Promise<Favorite>
}

export class CreateFavorite implements CreateFavoriteUseCase {
  constructor(private readonly favoriteRepository: FavoriteDataSource) {}

  async execute(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    const favorite = await this.favoriteRepository.create(createFavoriteDto)

    return {
      favorite: {
        favoriteId: favorite.favorite_id,
        productId: favorite.product_id
      }
    }
  }
}
