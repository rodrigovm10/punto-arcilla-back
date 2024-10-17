import { CreateProductDto } from '@domain/dtos'
import { ProductEntity } from '@domain/entities'

export abstract class ProductDataSource {
  abstract create(productDto: CreateProductDto): Promise<ProductEntity>

  abstract findAll(): Promise<ProductEntity[]>
}
