import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles.repository'
import { FindAllVehiclesService } from '@/services/vehicles/find-all-vehicles.service'

export function makeFindAllVehiclesService() {
  return new FindAllVehiclesService(new PrismaVehiclesRepository())
}
