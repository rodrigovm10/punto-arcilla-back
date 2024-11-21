import { CreateCartDto } from '@domain/dtos'
import { CartEntity } from '@domain/entities'

export abstract class CartRepository {
  abstract getCart(id: string): Promise<CartEntity>

  abstract create(createCartDto: CreateCartDto): Promise<CartEntity>

  abstract deleteProductFromCart(userId: string, productId: string): Promise<string>

  abstract clearCart(id: string): Promise<string>
}
