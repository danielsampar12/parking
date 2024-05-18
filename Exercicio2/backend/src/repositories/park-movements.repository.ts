import { ParkMovement, Prisma } from '@prisma/client'

export interface ParkMovementsRepository {
  create(data: Prisma.ParkMovementCreateInput): Promise<ParkMovement>
  exitParkMoviment(id: number, exitDate: Date): Promise<ParkMovement>
  findOpenedParkMovement(
    plate?: string,
    cardId?: string,
  ): Promise<ParkMovement | null>
}
