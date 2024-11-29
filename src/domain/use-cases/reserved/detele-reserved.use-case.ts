import { ReservedEntity } from '@domain/entities'
import { ReservedRepository } from '@domain/repositories'

interface DeleteReservedUseCase {
  execute(reservationId: string): Promise<ReservedEntity>
}

export class DeleteReserved implements DeleteReservedUseCase {
  constructor(private readonly reservedRepository: ReservedRepository) {}
  async execute(reservationId: string): Promise<ReservedEntity> {
    const reserved = await this.reservedRepository.deleteReservation(reservationId)

    return reserved
  }
}
