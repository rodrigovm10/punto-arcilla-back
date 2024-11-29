export class CreateReservedDto {
  private constructor(
    public productId: string,
    public customerId: string,
    public recipientId: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateReservedDto?] {
    const { productId, customerId, recipientId } = object

    if (!productId) return ['Missing productId']
    if (!customerId) return ['Missing customerId']
    if (!recipientId) return ['Missing recipientId']

    return [undefined, new CreateReservedDto(productId, customerId, recipientId)]
  }
}
