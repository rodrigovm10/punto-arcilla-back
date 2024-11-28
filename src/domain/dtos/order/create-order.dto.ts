import { Status } from '@prisma/client'

export class CreateOrderDto {
  private constructor(
    public userId: string,
    public status: Status,
    public cartId: string,
    public totalAmount: number,
    public userIdSeller: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateOrderDto?] {
    const { userId, status, cartId, totalAmount, userIdSeller } = object

    if (!userId) return ['Missing userId']
    if (!status) return ['Missing status']
    if (!cartId) return ['Missing cartId']
    if (!totalAmount) return ['Missing total amount']

    return [undefined, new CreateOrderDto(userId, status, cartId, totalAmount, userIdSeller)]
  }
}
