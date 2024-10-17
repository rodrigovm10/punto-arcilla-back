import { ProductEntity } from '@domain/entities'
import { ErrorCode, NoContentException } from '@domain/errors'
import { ProductRepository } from '@domain/repositories'

interface GetAllProductsUseCase {
  execute(): Promise<ProductEntity[]>
}

export class GetAllProducts implements GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    const products = await this.productRepository.findAll()

    if (products.length === 0) {
      throw new NoContentException(
        'There are no products available',
        ErrorCode.THERE_ARE_NOT_PRODUCTS
      )
    }

    return products
  }
}
