import { VehiclesRepository } from '@/repositories/vechiles.repository'
import { Vehicle } from '@prisma/client'
import { VehicleAlreadyExistsError } from '../error/vehicle-already-exists-error'

interface CreateVehicleRequest {
  plate: string
  model?: string
  description?: string
}

interface CreateVehicleResponse {
  vehicle: Vehicle
}

export class CreateVehicleService {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async execute(req: CreateVehicleRequest): Promise<CreateVehicleResponse> {
    const existingVehicle = await this.vehiclesRepository.findByPlate(req.plate)

    if (existingVehicle) {
      throw new VehicleAlreadyExistsError(req.plate)
    }

    const vehicle = await this.vehiclesRepository.create(req)

    return { vehicle }
  }
}
