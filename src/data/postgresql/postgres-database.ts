import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

export class PostgresDatabase {
  static async connect() {
    try {
      await prisma.$disconnect()

      console.log('Postgres connected')
      return
    } catch (error) {
      console.log('Postgres connection error')
      await prisma.$disconnect()
    }
  }
}
