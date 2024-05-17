import { ParkMovementsRepository } from '@/repositories/park-movements.repository'
import { VehiclesRepository } from '@/repositories/vechiles.repository'
import { ParkMovement } from '@prisma/client'
import { CantEntryCar } from '../error/cant-entry-card-error'
import { VechicleNotFoundError } from '../error/vehicle-not-foudn-error'

interface EntryCarRequest {
  entryDate?: Date
  plate?: string
  cardId?: string
}

interface EntryCarResponse {
  parkMovement: ParkMovement
}

export class EntryCarService {
  constructor(
    private readonly parkMovementsRepository: ParkMovementsRepository,
    private readonly vehiclesRepository: VehiclesRepository,
  ) {}

  async execute({
    entryDate = new Date(),
    cardId,
    plate,
  }: EntryCarRequest): Promise<EntryCarResponse> {
    if (plate) {
      const parkMovement = await this.parkMovementsRepository.create({
        entryDate,
        vehicle: {
          connectOrCreate: {
            where: { plate },
            create: { plate },
          },
        },
      })

      return { parkMovement }
    }

    if (cardId) {
      const vehicle = await this.vehiclesRepository.findByCustomerCardId(cardId)

      if (!vehicle) {
        throw new VechicleNotFoundError(`{customer.cardId: ${cardId} }`)
      }

      const parkMovement = await this.parkMovementsRepository.create({
        entryDate,
        vehicle: {
          connect: { id: vehicle.id },
        },
      })

      return { parkMovement }
    }

    throw new CantEntryCar()
  }
}
