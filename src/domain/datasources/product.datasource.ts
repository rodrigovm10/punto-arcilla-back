import { CreateProductDto, UpdateProductDto } from '@domain/dtos'
import { ProductEntity, ProductUpdatedEntity } from '@domain/entities'

export abstract class ProductDataSource {
  abstract create(productDto: CreateProductDto): Promise<ProductEntity>

  abstract findAll(): Promise<ProductEntity[]>

  abstract findById(id: string): Promise<ProductEntity>

  abstract delete(id: string): Promise<string>

  abstract update(id: string, productDto: UpdateProductDto): Promise<ProductUpdatedEntity>
}
