import { CartRepository } from '@domain/repositories'

interface Cart {
  message: string
}

interface ClearCartUseCase {
  execute(id: string): Promise<Cart>
}

export class ClearCart implements ClearCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(id: string): Promise<Cart> {
    const cart = await this.cartRepository.clearCart(id)

    return {
      message: cart
    }
  }
}
