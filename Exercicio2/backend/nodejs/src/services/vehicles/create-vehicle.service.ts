import { VehiclesRepository } from '@/repositories/vechiles.repository'
import { Vehicle } from '@prisma/client'

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
    const vehicle = await this.vehiclesRepository.create(req)

    return { vehicle }
  }
}
