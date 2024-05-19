import { PrismaParkMovementsRepository } from '@/repositories/prisma/prisma-park-movements.repository'
import { IsVehicleParkedService } from '@/services/park-movement/is-vehicle-parked.service'

export function makeIsVehicleParkedService() {
  return new IsVehicleParkedService(new PrismaParkMovementsRepository())
}
