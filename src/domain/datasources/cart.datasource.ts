import { CreateCartDto } from '@domain/dtos'
import { CartEntity, CartItemEntity } from '@domain/entities'

export abstract class CartDataSource {
  abstract getCart(id: string): Promise<CartEntity>

  abstract create(createCartDto: CreateCartDto): Promise<CartEntity>

  abstract deleteProductFromCart(userId: string, productId: string): Promise<CartItemEntity>

  abstract clearCart(id: string): Promise<string>

  abstract updateProductQuantity(
    id: string,
    productId: string,
    quantity: number
  ): Promise<CartItemEntity>
}
