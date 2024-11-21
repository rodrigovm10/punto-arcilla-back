import { CartDataSource } from '@domain/datasources'
import { CreateCartDto } from '@domain/dtos'
import { CartEntity } from '@domain/entities'
import { CartRepository } from '@domain/repositories'

export class CartRepositoryImpl implements CartRepository {
  constructor(private readonly cartDatasource: CartDataSource) {}

  create(createCartDto: CreateCartDto): Promise<CartEntity> {
    return this.cartDatasource.create(createCartDto)
  }
}
