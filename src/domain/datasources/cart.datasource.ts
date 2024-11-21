import { CreateCartDto } from '@domain/dtos'
import { CartEntity } from '@domain/entities'

export abstract class CartDataSource {
  abstract create(createCartDto: CreateCartDto): Promise<CartEntity>
}
