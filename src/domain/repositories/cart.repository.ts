import { CreateCartDto } from '@domain/dtos'
import { CartEntity } from '@domain/entities'

export abstract class CartRepository {
  abstract create(createCartDto: CreateCartDto): Promise<CartEntity>
}
