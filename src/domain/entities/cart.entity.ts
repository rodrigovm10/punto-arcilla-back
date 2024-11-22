import { CartItemEntity } from './cart-item.entity'

export class CartEntity {
  constructor(public id: string, public user_id: string, public cart_items: CartItemEntity) {}
}
