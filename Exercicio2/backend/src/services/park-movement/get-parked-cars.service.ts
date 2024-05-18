import {
  ParkMovementWithVehicle,
  ParkMovementsRepository,
} from '@/repositories/park-movements.repository'
import { PaginationParams } from '@/types/pagination-params'

interface GetParkedCarsRequest extends PaginationParams {}

interface GetParkedCarsResponse {
  parkMovements: ParkMovementWithVehicle[]
}

export class GetParkedCarsService {
  constructor(
    private readonly parkMovementsRepository: ParkMovementsRepository,
  ) {}

  async execute(
    pagination: GetParkedCarsRequest,
  ): Promise<GetParkedCarsResponse> {
    const parkMovements =
      await this.parkMovementsRepository.findParked(pagination)

    return { parkMovements }
  }
}
