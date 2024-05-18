import { ParkMovement, Prisma } from '@prisma/client'
import { ParkMovementsRepository } from '../park-movements.repository'
import { prisma } from '@/lib/prisma'

export class PrismaParkMovementsRepository implements ParkMovementsRepository {
  async create(data: Prisma.ParkMovementCreateInput): Promise<ParkMovement> {
    return await prisma.parkMovement.create({ data })
  }

  async findOpenedParkMovement(plate?: string, cardId?: string) {
    return await prisma.parkMovement.findFirst({
      where: {
        AND: [
          {
            vehicle: {
              OR: [
                {
                  plate,
                },
                {
                  customer: {
                    cardId,
                  },
                },
              ],
            },
          },
          {
            exitDate: null,
          },
        ],
      },
    })
  }

  async exitParkMoviment(id: number, exitDate: Date): Promise<ParkMovement> {
    return await prisma.parkMovement.update({
      where: {
        id,
      },
      data: {
        exitDate,
      },
    })
  }
}
