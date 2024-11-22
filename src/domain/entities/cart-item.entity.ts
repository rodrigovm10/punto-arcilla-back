export class CartItemEntity {
  constructor(
    public id: string,
    public quantity: number,
    public cart_id: string,
    public product_id: string
  ) {}
}
