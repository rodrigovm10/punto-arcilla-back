import { Router } from 'express'
import { AuthRoutes } from '@presentation/auth/routes'
import { ProductRoutes } from '@presentation/products/routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/products', ProductRoutes.routes)

    return router
  }
}
