import { ReservedDataSource } from '@domain/datasources'
import { CreateReservedDto } from '@domain/dtos'
import { ReservedEntity } from '@domain/entities'
import { ReservedRepository } from '@domain/repositories'
import { ReservedStatus } from '@prisma/client'

export class ReservedRepositoryImpl implements ReservedRepository {
  constructor(private readonly reservedDatasource: ReservedDataSource) {}
  create(reservedDto: CreateReservedDto): Promise<ReservedEntity> {
    return this.reservedDatasource.create(reservedDto)
  }
  updateStatusReservation(reservationId: string, status: ReservedStatus): Promise<ReservedEntity> {
    return this.reservedDatasource.updateStatusReservation(reservationId, status)
  }
  deleteReservation(reservationId: string): Promise<ReservedEntity> {
    return this.reservedDatasource.deleteReservation(reservationId)
  }
  getCustomerReservation(idCustomer: string): Promise<ReservedEntity[]> {
    return this.reservedDatasource.getCustomerReservation(idCustomer)
  }
  getRecipientReservation(idRecipient: string): Promise<ReservedEntity[]> {
    return this.reservedDatasource.getRecipientReservation(idRecipient)
  }
}
