import { VehiclesRepository } from '@/repositories/vechiles.repository'
import { Vehicle } from '@prisma/client'
import { PaginationParams } from '@/types/pagination-params'

interface FindAllVehiclesRequest extends PaginationParams {}

interface FindAllVehiclesResponse {
  vehicles: Vehicle[]
}

export class FindAllVehiclesService {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async execute(
    paginatinon: FindAllVehiclesRequest,
  ): Promise<FindAllVehiclesResponse> {
    const vehicles = await this.vehiclesRepository.findAll(paginatinon)

    return { vehicles }
  }
}
