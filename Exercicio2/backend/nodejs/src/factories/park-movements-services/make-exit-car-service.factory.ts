import { PrismaParkMovementsRepository } from '@/repositories/prisma/prisma-park-movements.repository'
import { ExitCarService } from '@/services/park-movement/exit-car.service'

export function makeExitCarService() {
  return new ExitCarService(new PrismaParkMovementsRepository())
}
