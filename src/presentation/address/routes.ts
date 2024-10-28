import { AddressDataSourceImpl } from '@infrastructure/datasources'
import { AddressRepositoryImpl } from '@infrastructure/repositories'
import { Router } from 'express'
import { AddressController } from './controller'
import { AuthMiddleware } from '@presentation/middlewares'

export class AddressRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new AddressDataSourceImpl()
    const addressRepository = new AddressRepositoryImpl(datasource)
    const controller = new AddressController(addressRepository)

    router.get('/:id', AuthMiddleware.validateJWT, controller.getAddressById)
    router.post('/', AuthMiddleware.validateJWT, controller.createAddress)
    return router
  }
}
