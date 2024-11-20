import { ProductEntity, ProfileEntity } from '@domain/entities'
import { UserRepository } from '@domain/repositories'

export interface GetProductsUseCase {
  execute(id: string): Promise<ProductEntity[]>
}

export class GetProducts implements GetProductsUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<ProductEntity[]> {
    const products = await this.userRepository.getProducts(id)

    return products
  }
}
