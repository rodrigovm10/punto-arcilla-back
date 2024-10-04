import express, { Router, json, urlencoded } from 'express'

interface Options {
  port?: number
  routes: Router
}

export class Server {
  public readonly app = express()
  private readonly port
  private readonly routes: Router

  constructor(options: Options) {
    const { port = 3000, routes } = options

    this.port = port
    this.routes = routes
  }

  async start() {
    // Middlewares
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))

    // Usar rutas
    this.app.use(this.routes)

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}
