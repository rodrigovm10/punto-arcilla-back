import { CreateCartDto } from '@domain/dtos'
import { CartRepository } from '@domain/repositories'

interface Cart {
  message: string
}

interface DeleteProductFromCartUseCase {
  execute(userId: string, productId: string): Promise<string>
}

export class DeleteProductFromCart implements DeleteProductFromCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: string, productId: string): Promise<string> {
    const cart = await this.cartRepository.deleteProductFromCart(userId, productId)

    return cart
  }
}
