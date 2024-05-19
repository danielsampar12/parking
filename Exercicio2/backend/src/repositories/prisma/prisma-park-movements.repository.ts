import { ParkMovement, Prisma } from '@prisma/client'
import {
  ParkMovementWithVehicle,
  ParkMovementWithVehicleAndCardId,
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
  }: PaginationParams): Promise<ParkMovementWithVehicleAndCardId[]> {
    return await prisma.parkMovement.findMany({
      where: { exitDate: null },
      include: {
        vehicle: {
          include: {
            // Pelo ERD enviado o cardId pertence ao Customer...
            // Me parece que ta errado, porque pelo enunciado da a entender que cardId é obrigatório
            // porém alguns veículos não tem cliente vinculado.
            // Como pede no enunciado: "Caso o veículo não esteja cadastrado na base de dados deverá cadastrar o mesmo sem vínculo com cliente, pois ele será um veículo rotativo."
            customer: {
              select: {
                cardId: true,
              },
            },
          },
        },
      },
      orderBy: {
        entryDate: 'desc',
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

  async exitParkMoviment(
    id: number,
    exitDate: Date,
  ): Promise<ParkMovementWithVehicle> {
    return await prisma.parkMovement.update({
      where: {
        id,
      },
      data: {
        exitDate,
      },
      include: {
        vehicle: true,
      },
    })
  }

  async isVehicleParkedByPlate(plate: string): Promise<boolean> {
    return !!(await prisma.parkMovement.findFirst({
      where: { vehicle: { plate } },
    }))
  }

  async isVehicleParkedByCardId(cardId: string): Promise<boolean> {
    return !!(await prisma.parkMovement.findFirst({
      where: { vehicle: { customer: { cardId } } },
    }))
  }
}
