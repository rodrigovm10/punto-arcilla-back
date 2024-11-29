import { ReservedEntity } from '@domain/entities'
import { ReservedRepository } from '@domain/repositories'

interface GetCustomerReservedUseCase {
  execute(customerId: string): Promise<ReservedEntity[]>
}

export class GetCustomerReserved implements GetCustomerReservedUseCase {
  constructor(private readonly reservedRepository: ReservedRepository) {}

  async execute(customerId: string): Promise<ReservedEntity[]> {
    const reserved = await this.reservedRepository.getCustomerReservation(customerId)

    return reserved
  }
}
