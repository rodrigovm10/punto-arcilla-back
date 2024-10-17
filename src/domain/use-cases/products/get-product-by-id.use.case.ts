import { ProductEntity } from '@domain/entities'
import { ProductRepository } from '@domain/repositories'

interface GetProductByIdUseCase {
  execute(id: string): Promise<ProductEntity>
}

export class GetProductById implements GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id)

    return product
  }
}
