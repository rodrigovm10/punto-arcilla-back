import { ProductDataSource } from '@domain/datasources'
import { CreateProductDto, UpdateProductDto } from '@domain/dtos'
import { ProductEntity, ProductUpdatedEntity } from '@domain/entities'
import { ProductRepository } from '@domain/repositories'

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly productDatasource: ProductDataSource) {}

  create(productDto: CreateProductDto): Promise<ProductEntity> {
    return this.productDatasource.create(productDto)
  }

  findAll(): Promise<ProductEntity[]> {
    return this.productDatasource.findAll()
  }

  findById(id: string): Promise<ProductEntity> {
    return this.productDatasource.findById(id)
  }

  delete(id: string): Promise<string> {
    return this.productDatasource.delete(id)
  }

  update(id: string, productDto: UpdateProductDto): Promise<ProductUpdatedEntity> {
    return this.productDatasource.update(id, productDto)
  }
}
