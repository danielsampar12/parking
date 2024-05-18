import { VehiclesRepository } from '@/repositories/vechiles.repository'
import { Vehicle } from '@prisma/client'
import { VechicleNotFoundError } from '../error/vehicle-not-foudn-error'

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
    const existingVehicle = await this.vehiclesRepository.findById(vehicleId)

    if (!existingVehicle) {
      throw new VechicleNotFoundError(vehicleId)
    }

    const vehicle = await this.vehiclesRepository.update(vehicleId, data)

    return { vehicle }
  }
}
