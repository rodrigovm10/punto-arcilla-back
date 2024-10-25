import { Router } from 'express'
import { AuthMiddleware } from '@presentation/middlewares'
import { ProfileDataSourceImpl } from '@infrastructure/datasources'
import { ProfileRepositoryImpl } from '@infrastructure/repositories'
import { ProfileController } from './controller'

export class ProfileRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new ProfileDataSourceImpl()
    const profileRepository = new ProfileRepositoryImpl(datasource)
    const controller = new ProfileController(profileRepository)

    router.get('/:id', AuthMiddleware.validateJWT, controller.getProfileById)
    router.post('/', AuthMiddleware.validateJWT, controller.createProfile)
    router.patch('/:id', AuthMiddleware.validateJWT, controller.updateProfile)

    return router
  }
}
