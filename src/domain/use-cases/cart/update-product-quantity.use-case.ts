import { CartItemEntity } from '@domain/entities'
import { CartRepository } from '@domain/repositories'

interface Cart {
  cart: {
    cartItem: CartItemEntity
  }
}

interface UpdateProductQuantityUseCase {
  execute(id: string, productId: string, quantity: number): Promise<Cart>
}

export class UpdateProductQuantity implements UpdateProductQuantityUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(id: string, productId: string, quantity: number): Promise<Cart> {
    const cartItem = await this.cartRepository.updateProductQuantity(id, productId, quantity)

    return {
      cart: {
        cartItem
      }
    }
  }
}
