import { ParkMovement, Prisma } from '@prisma/client'

export interface ParkMovementsRepository {
  create(data: Prisma.ParkMovementCreateInput): Promise<ParkMovement>
}
