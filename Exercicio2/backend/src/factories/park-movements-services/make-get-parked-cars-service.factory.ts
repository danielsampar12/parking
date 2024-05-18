import { PrismaParkMovementsRepository } from '@/repositories/prisma/prisma-park-movements.repository'
import { GetParkedCarsService } from '@/services/park-movement/get-parked-cars.service'

export function makeGetParkedCarsService() {
  return new GetParkedCarsService(new PrismaParkMovementsRepository())
}
