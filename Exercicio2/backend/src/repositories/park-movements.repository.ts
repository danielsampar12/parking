import { PaginationParams } from '@/types/pagination-params'
import { ParkMovement, Prisma, Vehicle } from '@prisma/client'

export type ParkMovementWithVehicle = ParkMovement & {
  vehicle: Vehicle
}

export type ParkMovementWithVehicleAndCardId = ParkMovement & {
  vehicle: Vehicle & {
    customer: {
      cardId: string
    } | null
  }
}

export interface ParkMovementsRepository {
  create(data: Prisma.ParkMovementCreateInput): Promise<ParkMovement>
  exitParkMoviment(id: number, exitDate: Date): Promise<ParkMovementWithVehicle>
  findOpenedParkMovement(
    plate?: string,
    cardId?: string,
  ): Promise<ParkMovement | null>
  findParked(
    pagination: PaginationParams,
  ): Promise<ParkMovementWithVehicleAndCardId[]>
  isVehicleParkedByPlate(plate: string): Promise<boolean>
  isVehicleParkedByCardId(cardId: string): Promise<boolean>
}
