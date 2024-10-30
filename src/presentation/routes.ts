import { Router } from 'express'

import { AuthRoutes } from '@presentation/auth/routes'
import { UserRoutes } from '@presentation/user/routes'
import { ProfileRoutes } from '@presentation/profile/routes'
import { ProductRoutes } from '@presentation/products/routes'
import { AddressRoutes } from '@presentation/address/routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/products', ProductRoutes.routes)
    router.use('/api/profile', ProfileRoutes.routes)
    router.use('/api/address', AddressRoutes.routes)
    router.use('/api/user', UserRoutes.routes)

    return router
  }
}
