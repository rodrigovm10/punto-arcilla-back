import { CreateReservedDto } from '@domain/dtos'
import { ReservedRepository } from '@domain/repositories'
import { ReservedStatus } from '@prisma/client'

interface Reserved {
  id: string
  productId: string
  customerId: string
  recipientId: string
  status: ReservedStatus
}

interface CreateReservedUseCase {
  execute(createReservedDto: CreateReservedDto): Promise<Reserved>
}

export class CreateReserved implements CreateReservedUseCase {
  constructor(private readonly reservedRepository: ReservedRepository) {}

  async execute(createReservedDto: CreateReservedDto): Promise<Reserved> {
    const reserved = await this.reservedRepository.create(createReservedDto)

    return {
      id: reserved.id,
      productId: reserved.productId,
      customerId: reserved.customerId,
      recipientId: reserved.recipientId,
      status: reserved.status
    }
  }
}
