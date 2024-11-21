export class CreateCartDto {
  private constructor(public userId: string, public quantity: number, public productId: string) {}

  static create(object: { [key: string]: any }): [string?, CreateCartDto?] {
    const { userId, quantity, productId } = object

    if (!userId) return ['Missing userId']
    if (!quantity) return ['Missing quantity']
    if (!productId) return ['Missing userId']

    return [undefined, new CreateCartDto(userId, quantity, productId)]
  }
}
