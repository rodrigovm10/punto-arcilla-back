import { CustomError } from '@domain/errors'
import { CreateProductDto } from '@domain/dtos'
import { ProductEntity } from '@domain/entities'
import { ProductDataSource } from '@domain/datasources'
import { prisma } from '@data/postgresql/postgres-database'
import { ProductMapper } from '@infrastructure/mappers/product.mapper'

export class ProductDataSourceImpl implements ProductDataSource {
  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const { user_id, name, description, price, images, status, stock, tags } = createProductDto

    try {
      // 1. Get user
      const user = await prisma.user.findFirst({
        where: {
          id: user_id
        }
      })

      // 2. Verify if user_id does not  exists
      if (!user) throw CustomError.notFound('User not found')

      // 3. Create product
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          images,
          status,
          stock,
          tags,
          user_id
        }
      })

      return ProductMapper.productEntityFromObject(product)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    try {
      const products = await prisma.product.findMany()

      return products.map(product => ProductMapper.productEntityFromObject(product))
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }

  async findById(id: string): Promise<ProductEntity> {
    try {
      const product = await prisma.product.findFirst({
        where: {
          id
        }
      })

      if (!product) {
        throw CustomError.notFound('Product not found')
      }

      return ProductMapper.productEntityFromObject(product)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }
}
