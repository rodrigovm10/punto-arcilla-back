import { Router } from 'express'
import { AuthRoutes } from '@presentation/auth/routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/api/auth', AuthRoutes.routes)
    //router.use('/api/products', (req, res) => {})

    return router
  }
}
