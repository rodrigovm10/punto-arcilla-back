import { CreateCartDto } from '@domain/dtos'
import { CartItemEntity } from '@domain/entities'
import { CartRepository } from '@domain/repositories'

interface CartItem {
  item: {
    id: string
    quantity: number
    cart_id: string
    product_id: string
  }
}

interface DeleteProductFromCartUseCase {
  execute(userId: string, productId: string): Promise<CartItem>
}

export class DeleteProductFromCart implements DeleteProductFromCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: string, productId: string): Promise<CartItem> {
    const cartItem = await this.cartRepository.deleteProductFromCart(userId, productId)

    return {
      item: {
        id: cartItem.id,
        cart_id: cartItem.cart_id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity
      }
    }
  }
}
