import { ReservedEntity } from '@domain/entities'
import { ReservedRepository } from '@domain/repositories'

interface GetRecipientReservedUseCase {
  execute(recipientId: string): Promise<ReservedEntity[]>
}

export class GetRecipientReserved implements GetRecipientReservedUseCase {
  constructor(private readonly reservedRepository: ReservedRepository) {}

  async execute(recipientId: string): Promise<ReservedEntity[]> {
    const reserved = await this.reservedRepository.getRecipientReservation(recipientId)

    return reserved
  }
}
