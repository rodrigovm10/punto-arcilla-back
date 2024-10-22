import { CustomError } from '@domain/errors'
import { CreateProductDto, UpdateProductDto } from '@domain/dtos'
import { ProductEntity, ProductUpdatedEntity } from '@domain/entities'
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
      if (!user) throw CustomError.notFound('Usuario no encontrado')

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

      if (!product) throw CustomError.notFound('Producto no encontrado.')

      return ProductMapper.productEntityFromObject(product)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServer()
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const productExists = await prisma.product.findFirst({ where: { id } })

      if (!productExists) throw CustomError.notFound('Producto no encontrado.')

      await prisma.product.delete({ where: { id } })

      return 'Product deleted succesfully'
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw error
    }
  }

  async update(id: string, productDto: UpdateProductDto): Promise<ProductUpdatedEntity> {
    try {
      const productExists = await prisma.product.findFirst({ where: { id } })

      if (!productExists) throw CustomError.notFound('El producto no existe.')

      const { images, imagesToDelete, tagsToDelete, tags, ...product } = productDto

      if (images) {
        const productUpdated = await prisma.product.update({
          where: { id },
          data: { ...product, images: { push: images } }
        })

        return ProductMapper.productEntityFromObject(productUpdated)
      }

      if (tags) {
        const productUpdated = await prisma.product.update({
          where: { id },
          data: { ...product, tags: { push: tags } }
        })

        return ProductMapper.productEntityFromObject(productUpdated)
      }

      const productUpdated = await prisma.product.update({
        where: { id },
        data: { ...product }
      })

      return ProductMapper.productEntityFromObject(productUpdated)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw error
    }
  }
}
