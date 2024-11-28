import { FavoriteDataSource } from '@domain/datasources'
import { CreateFavoriteDto } from '@domain/dtos'
import { FavoriteEntity } from '@domain/entities'
import { FavoriteRepository } from '@domain/repositories'

export class FavoriteRepositoryImpl implements FavoriteRepository {
  constructor(private readonly favoriteDatasource: FavoriteDataSource) {}

  create(favoriteDto: CreateFavoriteDto): Promise<FavoriteEntity> {
    return this.favoriteDatasource.create(favoriteDto)
  }
  getFavorites(userId: string): Promise<FavoriteEntity[]> {
    return this.favoriteDatasource.getFavorites(userId)
  }
}
