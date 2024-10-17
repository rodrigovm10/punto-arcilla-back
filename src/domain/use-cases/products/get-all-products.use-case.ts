import { ProductEntity } from '@domain/entities'
import { ProductRepository } from '@domain/repositories'

interface GetAllProductsUseCase {
  execute(): Promise<ProductEntity[] | string>
}

export class GetAllProducts implements GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductEntity[] | string> {
    const products = await this.productRepository.findAll()

    if (products.length === 0) {
      return 'There are no products'
    }

    return products
  }
}
