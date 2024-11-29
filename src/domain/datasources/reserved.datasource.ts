import { CreateReservedDto } from '@domain/dtos'
import { ReservedEntity } from '@domain/entities'
import { ReservedStatus } from '@prisma/client'

export abstract class ReservedDataSource {
  abstract create(reservedDto: CreateReservedDto): Promise<ReservedEntity>

  abstract updateStatusReservation(
    reservationId: string,
    status: ReservedStatus
  ): Promise<ReservedEntity>

  abstract deleteReservation(reservationId: string): Promise<ReservedEntity>

  abstract getCustomerReservation(idCustomer: string): Promise<ReservedEntity[]>

  abstract getRecipientReservation(idRecipient: string): Promise<ReservedEntity[]>
}
