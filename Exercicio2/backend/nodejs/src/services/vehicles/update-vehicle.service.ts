import { VehiclesRepository } from '@/repositories/vechiles.repository'
import { Vehicle } from '@prisma/client'

interface UpdateVehicleRequest {
  vehicleId: number
  data: {
    plate?: string
    model?: string
    description?: string
  }
}

interface UpdateVehicleResponse {
  vehicle: Vehicle
}

export class UpdateVehicleService {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async execute({
    vehicleId,
    data,
  }: UpdateVehicleRequest): Promise<UpdateVehicleResponse> {
    const vehicle = await this.vehiclesRepository.update(vehicleId, data)

    return { vehicle }
  }
}
