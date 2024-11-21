export class CartItemEntity {
  constructor(
    public id: string,
    public quantity: number,
    public cartId: string,
    public productId: string
  ) {}
}
