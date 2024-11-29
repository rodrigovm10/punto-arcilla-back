import { ReservedEntity } from '@domain/entities'
import { ReservedRepository } from '@domain/repositories'
import { ReservedStatus } from '@prisma/client'

interface UpdateStatusReservedUseCase {
  execute(reservedId: string, status: ReservedStatus): Promise<ReservedEntity>
}

export class UpdateReservedStatus implements UpdateStatusReservedUseCase {
  constructor(private readonly reservedRepository: ReservedRepository) {}

  async execute(reservedId: string, status: ReservedStatus): Promise<ReservedEntity> {
    const reserved = await this.reservedRepository.updateStatusReservation(reservedId, status)

    return reserved
  }
}
