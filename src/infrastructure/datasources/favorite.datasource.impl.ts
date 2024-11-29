import { prisma } from '@data/postgresql/postgres-database'
import { FavoriteDataSource } from '@domain/datasources'
import { CreateFavoriteDto } from '@domain/dtos'
import { FavoriteEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'
import { FavoriteMapper } from '@infrastructure/mappers'

export class FavoriteDataSourceImpl implements FavoriteDataSource {
  async deleteProduct(userId: string, productId: string): Promise<FavoriteEntity[]> {
    try {
      const favorite = await prisma.favorite.findFirst({
        where: {
          user_id: userId
        }
      })

      if (!favorite) throw CustomError.notFound('No hay favoritos.')

      const product = await prisma.productsOnFavorites.findFirst({
        where: {
          product_id: productId,
          favorite_id: favorite.id // Asegúrate de que tienes este valor
        }
      })

      if (!product) throw CustomError.notFound('El producto no esta en favoritos')

      await prisma.productsOnFavorites.delete({
        where: {
          product_id_favorite_id: {
            product_id: product.product_id,
            favorite_id: favorite.id
          }
        }
      })

      // Retornar los favoritos actualizados
      const updatedFavorites = await prisma.productsOnFavorites.findMany({
        where: {
          favorite_id: favorite.id
        }
      })

      return updatedFavorites.map(favorite => FavoriteMapper.favoriteEntityFromObject(favorite))
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }

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

      return favorites.map(favorite => FavoriteMapper.favoriteEntityFromObject(favorite))
      // return favorites.map(favorite =>
      //   FavoriteMapper.favoriteProductEntityFromObject({ ...favorite, product: favorite.product })
      // )
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }
}
