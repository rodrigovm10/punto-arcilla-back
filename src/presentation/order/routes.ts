import { OrderDataSourceImpl } from '@infrastructure/datasources/order.datasource.impl'
import { OrderRepositoryImpl } from '@infrastructure/repositories/order.repository.impl'
import { Router } from 'express'
import { OrderController } from './controller'
import { AuthMiddleware } from '@presentation/middlewares'

export class OrderRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new OrderDataSourceImpl()
    const orderRepository = new OrderRepositoryImpl(datasource)
    const controller = new OrderController(orderRepository)

    router.post('/', AuthMiddleware.validateJWT, controller.createOrder)

    return router
  }
}
