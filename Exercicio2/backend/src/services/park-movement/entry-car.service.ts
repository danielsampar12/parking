import { ParkMovementsRepository } from '@/repositories/park-movements.repository'
import { VehiclesRepository } from '@/repositories/vechiles.repository'
import { ParkMovement } from '@prisma/client'
import { CantEntryCar } from '../error/cant-entry-card-error'
import { VechicleNotFoundError } from '../error/vehicle-not-foudn-error'
import { OpendParkMovementError } from '../error/opened-park-moviment-error'

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
    const openedParkMovement =
      await this.parkMovementsRepository.findOpenedParkMovement(plate, cardId)

    if (openedParkMovement) {
      throw new OpendParkMovementError({ plate, cardId })
    }

    // if you have plate you can just create or connect the vehicle to the new parkMovement
    if (plate) {
      const parkMovement = await this.parkMovementsRepository.create({
        entryDate,
        vehicle: {
          connectOrCreate: {
            where: { plate },
            create: { plate: plate.toUpperCase() },
          },
        },
      })

      return { parkMovement }
    }

    // but if you don't have plate, you can't create a vehicle, just connect it (if it exists, of course)
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
