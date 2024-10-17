import { envs } from '@config/envs'
import { PostgresDatabase } from '@data/postgresql/postgres-database'
import { AppRoutes } from '@presentation/routes'
import { Server } from '@presentation/server'
;(() => {
  main()
})()

async function main() {
  await PostgresDatabase.connect()
  new Server({ port: Number(envs.PORT), routes: AppRoutes.routes }).start()
}
