import { CartItemEntity } from '@domain/entities'
import { CartRepository } from '@domain/repositories'

interface Cart {
  cart: {
    id: string
    cart_items: CartItemEntity
  }
}

interface GetCartUseCase {
  execute(id: string): Promise<Cart>
}

export class GetCart implements GetCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(id: string): Promise<Cart> {
    const cart = await this.cartRepository.getCart(id)

    return {
      cart: {
        id: cart.id,
        cart_items: cart.cart_items
      }
    }
  }
}
