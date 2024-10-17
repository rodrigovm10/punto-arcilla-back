import { Router } from 'express'

import { AuthMiddleware } from '@presentation/middlewares'
import { AuthController } from '@presentation/auth/controller'
import { AuthDataSourceImpl, AuthRepositoryImpl } from '@infrastructure/index'

export class AuthRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new AuthDataSourceImpl()
    const authRepository = new AuthRepositoryImpl(datasource)

    const controller = new AuthController(authRepository)

    // Rutas principales
    router.post('/login', controller.loginUser)
    router.post('/register', controller.registerUser)

    router.get('/', AuthMiddleware.validateJWT, controller.getUsers)

    return router
  }
}
