import express, { Router, json, urlencoded } from 'express'
import { ErrorMiddleware } from './middlewares/error.middleware'

interface Options {
  port?: number
  routes: Router
}

export class Server {
  public readonly app = express()
  private readonly port
  private readonly routes: Router

  constructor(options: Options) {
    const { port = 4000, routes } = options

    this.port = port
    this.routes = routes
  }

  async start() {
    // Middlewares
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))

    // Usar rutas
    this.app.use(this.routes)

    this.app.use(ErrorMiddleware.error)

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}
