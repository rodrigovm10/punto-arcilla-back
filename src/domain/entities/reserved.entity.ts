import { ReservedStatus } from '@prisma/client'

export class ReservedEntity {
  constructor(
    public id: string,
    public productId: string,
    public customerId: string,
    public recipientId: string,
    public status: ReservedStatus
  ) {}
}
