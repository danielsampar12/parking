import { ParkMovementsRepository } from '@/repositories/park-movements.repository'
import { ParkMovement } from '@prisma/client'
import { ParkMovementeNotFoundError } from '../error/park-movement-not-found-error'

interface ExitCarRequest {
  plate?: string
  cardId?: string
  exitDate: Date
}

interface ExitCarResponse {
  parkMovement: ParkMovement
}

export class ExitCarService {
  constructor(
    private readonly parkMovementsRepository: ParkMovementsRepository,
  ) {}

  async execute({
    cardId,
    plate,
    exitDate,
  }: ExitCarRequest): Promise<ExitCarResponse> {
    const openedParkMovement =
      await this.parkMovementsRepository.findOpenedParkMovement(plate, cardId)

    if (!openedParkMovement) {
      throw new ParkMovementeNotFoundError({ cardId, plate })
    }

    const parkMovement = await this.parkMovementsRepository.exitParkMoviment(
      openedParkMovement.id,
      exitDate,
    )

    return { parkMovement }
  }
}
