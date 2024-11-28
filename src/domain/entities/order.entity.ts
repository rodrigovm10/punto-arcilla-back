import { Status } from '@prisma/client'

export class OrderEntity {
  constructor(
    public id: string,
    public user_id: string,
    public status: Status,
    public total_amount: number,
    public cart_id: string,
    public userIdSeller: string
  ) {}
}
