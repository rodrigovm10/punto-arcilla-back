import { Router } from 'express'
import { AuthController } from './controller'
import { AuthDataSourceImpl, AuthRepositoryImpl } from '../../infrastructure'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { ErrorMiddleware } from '../middlewares/error.middleware'

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
