import { PrismaParkMovementsRepository } from '@/repositories/prisma/prisma-park-movements.repository'
import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles.repository'
import { ExitCarService } from '@/services/park-movement/exit-car.service'

export function makeExitCarService() {
  return new ExitCarService(
    new PrismaParkMovementsRepository(),
    new PrismaVehiclesRepository(),
  )
}
