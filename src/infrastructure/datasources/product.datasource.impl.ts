import { prisma } from '@data/postgresql/postgres-database'
import { ProductDataSource } from '@domain/datasources'
import { CreateProductDto } from '@domain/dtos'
import { ProductEntity } from '@domain/entities'
import { BadRequestException, ErrorCode, NoContentException } from '@domain/errors'
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
      if (!user) throw new BadRequestException('User not found', ErrorCode.USER_NOT_FOUND)

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
      throw error
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    try {
      const products = await prisma.product.findMany()

      return products.map(product => ProductMapper.productEntityFromObject(product))
    } catch (error) {
      throw error
    }
  }
}
