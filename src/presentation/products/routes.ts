import { Request, Router } from 'express'

import { AuthMiddleware } from '@presentation/middlewares'
import { ProductController } from '@presentation/products/controller'
import { ProductDataSourceImpl } from '@infrastructure/datasources'
import { ProductRepositoryImpl } from '@infrastructure/repositories'
import multer, { FileFilterCallback } from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

// const storage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
//     cb(null, 'uploads/')
//   },
//   filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
//     cb(null, `${Date.now()}-img-${file.filename.split('').shift()}`)
//   }
//P })
const storage = multer.memoryStorage()
const upload = multer({ storage })

export class ProductRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new ProductDataSourceImpl()
    const productRepository = new ProductRepositoryImpl(datasource)

    const controller = new ProductController(productRepository)

    router.get('/', AuthMiddleware.validateJWT, controller.getAllProducts)
    router.get('/', AuthMiddleware.validateJWT, controller.getAllProducts)
    router.get('/:id', AuthMiddleware.validateJWT, controller.getProductsById)

    router.post(
      '/',
      upload.array('images', 3),
      AuthMiddleware.validateJWT,
      controller.createProduct
    )
    router.patch('/:id', AuthMiddleware.validateJWT, controller.updateProduct)
    router.delete('/:id', AuthMiddleware.validateJWT, controller.deleteProduct)

    return router
  }
}
