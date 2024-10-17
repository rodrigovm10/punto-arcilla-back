import { CreateProductDto } from '@domain/dtos'
import { BadRequestException, ErrorCode } from '@domain/errors'
import { ProductRepository } from '@domain/repositories'

interface Product {
  created: boolean
  product: {
    id: string
    name: string
    description: string
    price: number
    stock: number
  }
}

interface CreateProductUseCase {
  execute(createProductDto: CreateProductDto): Promise<Product>
}

export class CreateProduct implements CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.create(createProductDto)

    if (!product) {
      throw new BadRequestException('Product not created', ErrorCode.PRODUCT_NOT_CREATED)
    }

    return {
      created: true,
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock
      }
    }
  }
}
