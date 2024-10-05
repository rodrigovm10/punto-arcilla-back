import { NextFunction, Request, Response } from 'express'
import { JwtAdapter } from '../../config'
import { prisma } from '../../data/postgresql/postgres-database'

export class AuthMiddleware {
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('Authorization')

    if (!authorization) return res.status(401).json({ error: 'No token provided' })
    if (!authorization.startsWith('Bearer '))
      return res.status(401).json({ error: 'Invalid Bearer Token' })

    const token = authorization.split(' ').at(1) || ''

    try {
      //todo:
      const payload = await JwtAdapter.validateToken<{ id: string }>(token)

      if (!payload) return res.status(401).json({ error: 'Invalid token' })

      const user = await prisma.user.findUnique({ where: { id: payload.id } })
      if (!user) return res.status(401).json({ error: 'Invalid token - user not found' })

      req.body.user = user
      next()
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
