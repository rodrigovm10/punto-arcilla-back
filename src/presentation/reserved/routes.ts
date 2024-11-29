import { ReservedDataSourceImpl } from '@infrastructure/datasources'
import { ReservedRepositoryImpl } from '@infrastructure/repositories/reserved.repository.impl'
import { AuthMiddleware } from '@presentation/middlewares'
import { Router } from 'express'
import { ReservedController } from './controller'

export class ReservedRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new ReservedDataSourceImpl()
    const repository = new ReservedRepositoryImpl(datasource)
    const controller = new ReservedController(repository)

    router.post('/', AuthMiddleware.validateJWT, controller.createReserved)
    router.get('/customer/:customerId', AuthMiddleware.validateJWT, controller.getCustomerReserved)
    router.get(
      '/recipient/:recipientId',
      AuthMiddleware.validateJWT,
      controller.getRecipientReserved
    )
    router.patch('/:reservedId', AuthMiddleware.validateJWT, controller.updateReservedStatus)
    router.delete('/:reservedId', AuthMiddleware.validateJWT, controller.deleteReserved)
    return router
  }
}
