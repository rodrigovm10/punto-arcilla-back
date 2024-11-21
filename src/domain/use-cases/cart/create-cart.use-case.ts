import { CreateCartDto } from '@domain/dtos'
import { CartItemEntity } from '@domain/entities'
import { CartRepository } from '@domain/repositories'

interface Cart {
  cart: {
    id: string
    cart_items: CartItemEntity
  }
}

interface CreatCartUseCase {
  execute(createCartDto: CreateCartDto): Promise<Cart>
}

export class CreateCart implements CreatCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(CreateCartDto: CreateCartDto): Promise<Cart> {
    const cart = await this.cartRepository.create(CreateCartDto)

    return {
      cart: {
        id: cart.id,
        cart_items: cart.cart_items
      }
    }
  }
}
