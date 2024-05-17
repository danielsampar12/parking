import { PrismaParkMovementsRepository } from '@/repositories/prisma/prisma-park-movements.repository'
import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles.repository'
import { EntryCarService } from '@/services/park-movement/entry-car.service'

export function makeEntryCarService() {
  return new EntryCarService(
    new PrismaParkMovementsRepository(),
    new PrismaVehiclesRepository(),
  )
}
