import { FavoriteDataSourceImpl } from '@infrastructure/datasources/favorite.datasource.impl'
import { FavoriteRepositoryImpl } from '@infrastructure/repositories/favorite.repository.impl'
import { AuthMiddleware } from '@presentation/middlewares'
import { Router } from 'express'
import { FavoriteController } from './controller'

export class FavoriteRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new FavoriteDataSourceImpl()
    const repository = new FavoriteRepositoryImpl(datasource)
    const controller = new FavoriteController(repository)

    router.post('/', AuthMiddleware.validateJWT, controller.createFavorite)
    router.get('/:id', AuthMiddleware.validateJWT, controller.getFavorite)
    return router
  }
}
