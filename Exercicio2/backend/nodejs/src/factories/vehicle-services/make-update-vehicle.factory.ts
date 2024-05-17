import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles.repository'
import { UpdateVehicleService } from '@/services/vehicles/update-vehicle.service'

export function makeUpdateVehicleService() {
  return new UpdateVehicleService(new PrismaVehiclesRepository())
}
