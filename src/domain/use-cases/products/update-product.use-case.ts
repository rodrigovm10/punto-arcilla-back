import { UpdateProductDto } from '@domain/dtos'
import { ProductRepository } from '@domain/repositories'

interface Product {
  updated: boolean
  product: {
    id: string
    name?: string
    description?: string
    price?: number
    stock?: number
    images?: string[]
    tags?: string[]
  }
}

interface UpdateProductUseCase {
  execute(id: string, productDto: UpdateProductDto): Promise<Product>
}

export class UpdateProduct implements UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, productDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.update(id, productDto)

    return {
      updated: true,
      product: product
    }
  }
}
