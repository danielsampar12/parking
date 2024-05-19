import { ParkMovementsRepository } from '@/repositories/park-movements.repository'

interface IsVehicleParkedServiceByPlateRequest {
  plate: string
}

interface IsVehicleParkedServiceByCardIdRequest {
  cardId: string
}

interface IsVehicleParkedServiceResponse {
  isParked: boolean
}

export class IsVehicleParkedService {
  constructor(
    private readonly parkMovementsRepository: ParkMovementsRepository,
  ) {}

  async executeByPlate({
    plate,
  }: IsVehicleParkedServiceByPlateRequest): Promise<IsVehicleParkedServiceResponse> {
    const isParked =
      await this.parkMovementsRepository.isVehicleParkedByPlate(plate)

    return { isParked }
  }

  async executeByCardId({
    cardId,
  }: IsVehicleParkedServiceByCardIdRequest): Promise<IsVehicleParkedServiceResponse> {
    const isParked =
      await this.parkMovementsRepository.isVehicleParkedByCardId(cardId)

    return { isParked }
  }
}
