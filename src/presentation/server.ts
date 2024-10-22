import express, { Router, json, urlencoded } from 'express'
import cors from 'cors'
interface Options {
  port?: number
  routes: Router
}

export class Server {
  public readonly app = express()
  private readonly port
  private readonly routes: Router
  readonly whiteList = ['http://localhost:8081', 'https://echo.hoppscotch.io']

  constructor(options: Options) {
    const { port = 4000, routes } = options

    this.port = port
    this.routes = routes
  }

  async start() {
    // Middlewares
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(cors({ origin: this.whiteList }))

    // Usar rutas
    this.app.use(this.routes)

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}
