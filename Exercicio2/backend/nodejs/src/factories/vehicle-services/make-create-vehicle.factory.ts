import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles.repository'
import { CreateVehicleService } from '@/services/vehicles/create-vehicle.service'

export function makeCreateVehicleService() {
  return new CreateVehicleService(new PrismaVehiclesRepository())
}
