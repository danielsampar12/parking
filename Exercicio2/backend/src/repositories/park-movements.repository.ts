import { PaginationParams } from '@/types/pagination-params'
import { ParkMovement, Prisma, Vehicle } from '@prisma/client'

export type ParkMovementWithVehicle = ParkMovement & {
  vehicle: Vehicle
}

export interface ParkMovementsRepository {
  create(data: Prisma.ParkMovementCreateInput): Promise<ParkMovement>
  exitParkMoviment(id: number, exitDate: Date): Promise<ParkMovement>
  findOpenedParkMovement(
    plate?: string,
    cardId?: string,
  ): Promise<ParkMovement | null>
  findParked(pagination: PaginationParams): Promise<ParkMovementWithVehicle[]>
}
