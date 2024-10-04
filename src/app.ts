import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'
;(() => {
  main()
})()

async function main() {
  new Server({ port: Number(process.env.PORT), routes: AppRoutes.routes }).start()
}
