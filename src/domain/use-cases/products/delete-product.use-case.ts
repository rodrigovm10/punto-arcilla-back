import { ProductRepository } from '@domain/repositories'

interface DeleteProductUseCase {
  execute(id: string): Promise<string>
}

export class DeleteProduct implements DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<string> {
    const message = await this.productRepository.delete(id)

    return message
  }
}
