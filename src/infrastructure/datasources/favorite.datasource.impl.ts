import { prisma } from '@data/postgresql/postgres-database'
import { FavoriteDataSource } from '@domain/datasources'
import { CreateFavoriteDto } from '@domain/dtos'
import { FavoriteEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'
import { FavoriteMapper } from '@infrastructure/mappers'

export class FavoriteDataSourceImpl implements FavoriteDataSource {
  async create(favoriteDto: CreateFavoriteDto): Promise<FavoriteEntity> {
    const { product_id, user_id } = favoriteDto

    try {
      let favorite = await prisma.favorite.findUnique({
        where: { user_id }
      })

      if (!favorite) {
        favorite = await prisma.favorite.create({
          data: {
            user_id
          }
        })
      }

      const existingProduct = await prisma.productsOnFavorites.findUnique({
        where: {
          product_id_favorite_id: {
            product_id,
            favorite_id: favorite.id
          }
        }
      })

      if (existingProduct) throw CustomError.badRequest('El producto ya existe en favoritos')

      const favorites = await prisma.productsOnFavorites.create({
        data: {
          product_id,
          favorite_id: favorite.id
        }
      })

      return FavoriteMapper.favoriteEntityFromObject(favorites)
    } catch (error) {
      console.log(error)
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }
  async getFavorites(userId: string): Promise<FavoriteEntity[]> {
    try {
      const favorite = await prisma.favorite.findFirst({
        where: {
          user_id: userId
        }
      })

      const favorites = await prisma.productsOnFavorites.findMany({
        where: {
          favorite_id: favorite?.id
        }
      })

      if (!favorite) throw CustomError.notFound('No tienes productos favoritos.')

      console.log(favorite)

      return favorites.map(favorite => FavoriteMapper.favoriteEntityFromObject(favorite))
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }
}
