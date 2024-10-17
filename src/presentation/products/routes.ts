import { Router } from 'express'
import { ProductController } from '@presentation/products/controller'
import { ProductDataSourceImpl } from '@infrastructure/datasources/product.datasource.impl'
import { ProductRepositoryImpl } from '@infrastructure/repositories'
import { AuthMiddleware } from '@presentation/middlewares'

export class ProductRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new ProductDataSourceImpl()
    const productRepository = new ProductRepositoryImpl(datasource)

    const controller = new ProductController(productRepository)

    router.get('/', AuthMiddleware.validateJWT, controller.getAllProducts)
    router.get('/', AuthMiddleware.validateJWT, controller.getAllProducts)
    router.get('/:id', AuthMiddleware.validateJWT, controller.getProductsById)

    router.post('/', AuthMiddleware.validateJWT, controller.createProduct)
    router.patch('/:id', AuthMiddleware.validateJWT, controller.updateProduct)
    router.delete('/:id', AuthMiddleware.validateJWT, controller.deleteProduct)

    return router
  }
}
