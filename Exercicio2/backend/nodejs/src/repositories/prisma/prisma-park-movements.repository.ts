import { ParkMovement, Prisma } from '@prisma/client'
import { ParkMovementsRepository } from '../park-movements.repository'
import { prisma } from '@/lib/prisma'

export class PrismaParkMovementsRepository implements ParkMovementsRepository {
  async create(data: Prisma.ParkMovementCreateInput): Promise<ParkMovement> {
    return await prisma.parkMovement.create({ data })
  }
}
