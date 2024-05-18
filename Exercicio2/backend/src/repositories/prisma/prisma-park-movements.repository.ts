import { ParkMovement, Prisma } from '@prisma/client'
import {
  ParkMovementWithVehicle,
  ParkMovementsRepository,
} from '../park-movements.repository'
import { prisma } from '@/lib/prisma'
import { PaginationParams } from '@/types/pagination-params'

export class PrismaParkMovementsRepository implements ParkMovementsRepository {
  async create(data: Prisma.ParkMovementCreateInput): Promise<ParkMovement> {
    return await prisma.parkMovement.create({ data })
  }

  async findParked({
    page = 1,
    take,
  }: PaginationParams): Promise<ParkMovementWithVehicle[]> {
    return await prisma.parkMovement.findMany({
      where: { exitDate: null },
      include: {
        vehicle: true,
      },
      skip: take ? (page - 1) * take : 0,
      take,
    })
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
