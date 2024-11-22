import { CartDataSourceImpl } from '@infrastructure/datasources'
import { CartRepositoryImpl } from '@infrastructure/repositories'
import { Router } from 'express'
import { CartController } from './controller'
import { AuthMiddleware } from '@presentation/middlewares'

export class CartRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new CartDataSourceImpl()
    const cartRepository = new CartRepositoryImpl(datasource)
    const controller = new CartController(cartRepository)

    router.get('/:id', AuthMiddleware.validateJWT, controller.getCart)
    router.post('/', AuthMiddleware.validateJWT, controller.createCart)
    router.delete(
      '/:userId/items/:productId',
      AuthMiddleware.validateJWT,
      controller.deleteProductFromCart
    )
    router.delete('/:id', AuthMiddleware.validateJWT, controller.clearCart)
    router.patch(
      '/:id/item/:productId',
      AuthMiddleware.validateJWT,
      controller.updateProductQuantity
    )

    return router
  }
}
