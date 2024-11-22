import { CartDataSource } from '@domain/datasources'
import { CreateCartDto } from '@domain/dtos'
import { CartEntity, CartItemEntity } from '@domain/entities'
import { CartRepository } from '@domain/repositories'

export class CartRepositoryImpl implements CartRepository {
  constructor(private readonly cartDatasource: CartDataSource) {}
  updateProductQuantity(id: string, productId: string, quantity: number): Promise<CartItemEntity> {
    return this.cartDatasource.updateProductQuantity(id, productId, quantity)
  }

  getCart(id: string): Promise<CartEntity> {
    return this.cartDatasource.getCart(id)
  }

  deleteProductFromCart(userId: string, productId: string): Promise<string> {
    return this.cartDatasource.deleteProductFromCart(userId, productId)
  }

  create(createCartDto: CreateCartDto): Promise<CartEntity> {
    return this.cartDatasource.create(createCartDto)
  }

  clearCart(id: string): Promise<string> {
    return this.cartDatasource.clearCart(id)
  }
}
