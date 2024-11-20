import { UserDataSourceImpl } from '@infrastructure/datasources'
import { UserRepositoryImpl } from '@infrastructure/repositories'
import { Router } from 'express'
import { UserController } from './controller'
import { AuthMiddleware } from '@presentation/middlewares'

export class UserRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new UserDataSourceImpl()
    const userRepository = new UserRepositoryImpl(datasource)
    const controller = new UserController(userRepository)

    router.get('/:id', AuthMiddleware.validateJWT, controller.getUser)
    router.get('/:id/address', AuthMiddleware.validateJWT, controller.getAddress)
    router.get('/:id/profile', AuthMiddleware.validateJWT, controller.getProfile)
    router.get('/:id/products', AuthMiddleware.validateJWT, controller.getProducts)
    router.patch('/:id/role', AuthMiddleware.validateJWT, controller.updateRole)

    return router
  }
}
